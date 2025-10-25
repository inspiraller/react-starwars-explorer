import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as axGetModule from '@/context/Tanstack/dynamic/axGet';
import useGetAllPages from '@/context/Tanstack/dynamic/useGetAllPages';

// Mock data
interface Person {
  name: string;
  height: string;
  mass: string;
}

const createMockResponse = (pageNum: number): Person[] => [
  { name: `Person ${pageNum}A`, height: '170', mass: '70' },
  { name: `Person ${pageNum}B`, height: '180', mass: '80' },
];

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useGetAllPages', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should fetch all pages when totalPages is less than batch size', async () => {
    vi.useRealTimers();
    const axGetSpy = vi.spyOn(axGetModule, 'axGet');
    for (let i = 1; i <= 5; i++) {
      axGetSpy.mockResolvedValueOnce(createMockResponse(i));
    }

    const { result } = renderHook(
      () =>
        useGetAllPages<Person[]>({
          url: '/people',
          totalPages: 5,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.every((q) => q.isSuccess)).toBe(true);
    });

    expect(result.current).toHaveLength(5);
    expect(axGetSpy).toHaveBeenCalledTimes(5);
  });

  it('should handle totalPages = 0 gracefully', async () => {
    const axGetSpy = vi.spyOn(axGetModule, 'axGet');

    const { result } = renderHook(
      () =>
        useGetAllPages<Person[]>({
          url: '/people',
          totalPages: 0,
        }),
      { wrapper: createWrapper() },
    );

    expect(result.current).toEqual([]);
    expect(axGetSpy).not.toHaveBeenCalled();
  });

  it('should handle totalPages = 1 correctly', async () => {
    const axGetSpy = vi
      .spyOn(axGetModule, 'axGet')
      .mockResolvedValueOnce(createMockResponse(1));

    const { result } = renderHook(
      () =>
        useGetAllPages<Person[]>({
          url: '/people',
          totalPages: 1,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current[0].isSuccess).toBe(true);
    });

    expect(result.current).toHaveLength(1);
    expect(axGetSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle rejected requests gracefully', async () => {
    const axGetSpy = vi.spyOn(axGetModule, 'axGet');
    axGetSpy.mockResolvedValueOnce(createMockResponse(1));
    axGetSpy.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(
      () =>
        useGetAllPages<Person[]>({
          url: '/people',
          totalPages: 2,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.some((q) => q.isError)).toBe(true);
    });

    expect(result.current).toHaveLength(2);
    expect(axGetSpy).toHaveBeenCalledTimes(2);
  });

  it('should apply callback transformation to each page', async () => {
    const axGetSpy = vi.spyOn(axGetModule, 'axGet');
    for (let i = 1; i <= 3; i++) {
      axGetSpy.mockResolvedValueOnce(createMockResponse(i));
    }

    // Callback that transforms the data
    const callback = vi.fn((data: Person[]) =>
      data.map((p) => ({ ...p, mass: '100' })),
    );

    const { result } = renderHook(
      () =>
        useGetAllPages<Person[]>({
          url: '/people',
          totalPages: 3,
          callback,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.every((q) => q.isSuccess)).toBe(true);
    });

    // Callback is called once per page
    expect(callback).toHaveBeenCalledTimes(3);

    // Verify transformed data
    expect(result.current[0].data?.every((p) => p.mass === '100')).toBe(true);
    expect(result.current[1].data?.every((p) => p.mass === '100')).toBe(true);
    expect(result.current[2].data?.every((p) => p.mass === '100')).toBe(true);
  });
});
