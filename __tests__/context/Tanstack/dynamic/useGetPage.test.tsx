import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as axGetModule from '@/context/Tanstack/dynamic/axGet';
import useGetPage from '@/context/Tanstack/dynamic/useGetPage';

// Mock data
interface Person {
  name: string;
  height: string;
  mass: string;
}

const mockResponsePage1: Person[] = [
  { name: 'Luke Skywalker', height: '172', mass: '77' },
  { name: 'Darth Vader', height: '202', mass: '136' },
];

const mockResponsePage2: Person[] = [
  { name: 'Leia Organa', height: '150', mass: '49' },
  { name: 'Han Solo', height: '180', mass: '80' },
];

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useGetPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data for page 1 correctly', async () => {
    const axGetSpy = vi
      .spyOn(axGetModule, 'axGet')
      .mockResolvedValue(mockResponsePage1);

    const { result } = renderHook(
      () => useGetPage<Person[]>({ url: '/people', page: 1 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockResponsePage1);
    expect(axGetSpy).toHaveBeenCalledWith({
      url: '/people',
      propsQueryString: { page: 1 },
    });
  });

  it('should fetch data for page 2 correctly', async () => {
    const axGetSpy = vi
      .spyOn(axGetModule, 'axGet')
      .mockResolvedValue(mockResponsePage2);

    const { result } = renderHook(
      () => useGetPage<Person[]>({ url: '/people', page: 2 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockResponsePage2);
    expect(axGetSpy).toHaveBeenCalledWith({
      url: '/people',
      propsQueryString: { page: 2 },
    });
  });

  it('should call callback function if provided', async () => {
    const callback = vi.fn((data: Person[]) =>
      data.map((p) => ({ ...p, mass: '100' })),
    );

    vi.spyOn(axGetModule, 'axGet').mockResolvedValue(mockResponsePage1);

    const { result } = renderHook(
      () => useGetPage<Person[]>({ url: '/people', page: 1, callback }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(callback).toHaveBeenCalledWith(mockResponsePage1);
    expect(result.current.data).toEqual(
      mockResponsePage1.map((p) => ({ ...p, mass: '100' })),
    );
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    vi.spyOn(axGetModule, 'axGet').mockRejectedValue(error);

    const { result } = renderHook(
      () => useGetPage<Person[]>({ url: '/people', page: 1 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(error);
  });

  it('should use different query keys for different pages', async () => {
    const axGetSpy = vi
      .spyOn(axGetModule, 'axGet')
      .mockResolvedValueOnce(mockResponsePage1)
      .mockResolvedValueOnce(mockResponsePage2);

    const { result: result1 } = renderHook(
      () => useGetPage<Person[]>({ url: '/people', page: 1 }),
      { wrapper: createWrapper() },
    );

    const { result: result2 } = renderHook(
      () => useGetPage<Person[]>({ url: '/people', page: 2 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result1.current.isSuccess).toBe(true));
    await waitFor(() => expect(result2.current.isSuccess).toBe(true));

    expect(result1.current.data).toEqual(mockResponsePage1);
    expect(result2.current.data).toEqual(mockResponsePage2);
    expect(axGetSpy).toHaveBeenCalledTimes(2);
  });

  it('should update data when page changes', async () => {
    const axGetSpy = vi
      .spyOn(axGetModule, 'axGet')
      .mockResolvedValueOnce(mockResponsePage1)
      .mockResolvedValueOnce(mockResponsePage2);

    const { result, rerender } = renderHook(
      ({ page }) => useGetPage<Person[]>({ url: '/people', page }),
      {
        wrapper: createWrapper(),
        initialProps: { page: 1 },
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockResponsePage1);

    // Change page
    rerender({ page: 2 });

    await waitFor(() => expect(result.current.data).toEqual(mockResponsePage2));

    expect(axGetSpy).toHaveBeenCalledTimes(2);
    expect(axGetSpy).toHaveBeenNthCalledWith(1, {
      url: '/people',
      propsQueryString: { page: 1 },
    });
    expect(axGetSpy).toHaveBeenNthCalledWith(2, {
      url: '/people',
      propsQueryString: { page: 2 },
    });
  });

  it('should work without callback parameter', async () => {
    vi.spyOn(axGetModule, 'axGet').mockResolvedValue(mockResponsePage1);

    const { result } = renderHook(
      () =>
        useGetPage<Person[]>({
          url: '/people',
          page: 1,
          // No callback provided
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockResponsePage1);
  });
});
