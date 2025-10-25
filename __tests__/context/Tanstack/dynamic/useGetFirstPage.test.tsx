import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as axGetModule from '@/context/Tanstack/dynamic/axGet';
import useGetFirstPage from '@/context/Tanstack/dynamic/useGetFirstPage';

// Mock data
interface Person {
  name: string;
  height: string;
  mass: string;
}

const mockResponse: Person[] = [
  { name: 'Luke Skywalker', height: '172', mass: '77' },
  { name: 'Darth Vader', height: '202', mass: '136' },
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

describe('useGetFirstPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data correctly', async () => {
    const axGetSpy = vi
      .spyOn(axGetModule, 'axGet')
      .mockResolvedValue(mockResponse);

    const { result } = renderHook(
      () => useGetFirstPage<Person[]>({ url: '/people' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockResponse);
    expect(axGetSpy).toHaveBeenCalledWith({
      url: '/people',
      propsQueryString: { page: 1 },
    });
  });

  it('should call callback function if provided', async () => {
    const callback = vi.fn((data: Person[]) =>
      data.map((p) => ({ ...p, mass: '100' })),
    );

    vi.spyOn(axGetModule, 'axGet').mockResolvedValue(mockResponse);

    const { result } = renderHook(
      () => useGetFirstPage<Person[]>({ url: '/people', callback }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(callback).toHaveBeenCalledWith(mockResponse);
    expect(result.current.data).toEqual(
      mockResponse.map((p) => ({ ...p, mass: '100' })),
    );
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    vi.spyOn(axGetModule, 'axGet').mockRejectedValue(error);

    const { result } = renderHook(
      () => useGetFirstPage<Person[]>({ url: '/people' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(error);
  });
});
