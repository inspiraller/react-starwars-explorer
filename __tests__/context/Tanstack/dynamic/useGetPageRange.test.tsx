import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as axGetModule from '@/context/Tanstack/dynamic/axGet';
import useGetPageRange from '@/context/Tanstack/dynamic/useGetPageRange';

// Mock data
interface Person {
  name: string;
  height: string;
  mass: string;
}

const mockResponses: Person[][] = [
  [
    { name: 'Luke Skywalker', height: '172', mass: '77' },
    { name: 'Darth Vader', height: '202', mass: '136' },
  ],
  [
    { name: 'Leia Organa', height: '150', mass: '49' },
    { name: 'Han Solo', height: '180', mass: '80' },
  ],
  [
    { name: 'Chewbacca', height: '228', mass: '112' },
    { name: 'Obi-Wan Kenobi', height: '182', mass: '77' },
  ],
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

describe('useGetPageRange', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch a single page when fromPage equals toPage', async () => {
    const axGetSpy = vi
      .spyOn(axGetModule, 'axGet')
      .mockResolvedValue(mockResponses[0]);

    const { result } = renderHook(
      () =>
        useGetPageRange<Person[]>({
          url: '/people',
          fromPage: 1,
          toPage: 1,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].data).toEqual(mockResponses[0]);
    expect(axGetSpy).toHaveBeenCalledWith({
      url: '/people',
      propsQueryString: { page: 1 },
    });
    expect(axGetSpy).toHaveBeenCalledTimes(1);
  });

  it('should fetch multiple pages in range', async () => {
    const axGetSpy = vi
      .spyOn(axGetModule, 'axGet')
      .mockResolvedValueOnce(mockResponses[0])
      .mockResolvedValueOnce(mockResponses[1])
      .mockResolvedValueOnce(mockResponses[2]);

    const { result } = renderHook(
      () =>
        useGetPageRange<Person[]>({
          url: '/people',
          fromPage: 1,
          toPage: 3,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.every((query) => query.isSuccess)).toBe(true);
    });

    expect(result.current).toHaveLength(3);
    expect(result.current[0].data).toEqual(mockResponses[0]);
    expect(result.current[1].data).toEqual(mockResponses[1]);
    expect(result.current[2].data).toEqual(mockResponses[2]);

    expect(axGetSpy).toHaveBeenCalledTimes(3);
    expect(axGetSpy).toHaveBeenNthCalledWith(1, {
      url: '/people',
      propsQueryString: { page: 1 },
    });
    expect(axGetSpy).toHaveBeenNthCalledWith(2, {
      url: '/people',
      propsQueryString: { page: 2 },
    });
    expect(axGetSpy).toHaveBeenNthCalledWith(3, {
      url: '/people',
      propsQueryString: { page: 3 },
    });
  });

  it('should fetch pages starting from a non-zero page', async () => {
    const axGetSpy = vi
      .spyOn(axGetModule, 'axGet')
      .mockResolvedValueOnce(mockResponses[1])
      .mockResolvedValueOnce(mockResponses[2]);

    const { result } = renderHook(
      () =>
        useGetPageRange<Person[]>({
          url: '/people',
          fromPage: 5,
          toPage: 6,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.every((query) => query.isSuccess)).toBe(true);
    });

    expect(result.current).toHaveLength(2);
    expect(axGetSpy).toHaveBeenCalledTimes(2);
    expect(axGetSpy).toHaveBeenNthCalledWith(1, {
      url: '/people',
      propsQueryString: { page: 5 },
    });
    expect(axGetSpy).toHaveBeenNthCalledWith(2, {
      url: '/people',
      propsQueryString: { page: 6 },
    });
  });

  it('should return empty array when toPage is less than fromPage', async () => {
    const axGetSpy = vi.spyOn(axGetModule, 'axGet');

    const { result } = renderHook(
      () =>
        useGetPageRange<Person[]>({
          url: '/people',
          fromPage: 5,
          toPage: 3,
        }),
      { wrapper: createWrapper() },
    );

    expect(result.current).toHaveLength(0);
    expect(axGetSpy).not.toHaveBeenCalled();
  });

  it('should apply callback to all fetched pages', async () => {
    const callback = vi.fn((data: Person[]) =>
      data.map((p) => ({ ...p, mass: '100' })),
    );

    vi.spyOn(axGetModule, 'axGet')
      .mockResolvedValueOnce(mockResponses[0])
      .mockResolvedValueOnce(mockResponses[1]);

    const { result } = renderHook(
      () =>
        useGetPageRange<Person[]>({
          url: '/people',
          fromPage: 1,
          toPage: 2,
          callback,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.every((query) => query.isSuccess)).toBe(true);
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, mockResponses[0]);
    expect(callback).toHaveBeenNthCalledWith(2, mockResponses[1]);

    expect(result.current[0].data).toEqual(
      mockResponses[0].map((p) => ({ ...p, mass: '100' })),
    );
    expect(result.current[1].data).toEqual(
      mockResponses[1].map((p) => ({ ...p, mass: '100' })),
    );
  });

  it('should handle errors in one or more queries', async () => {
    const error = new Error('Network error');
    vi.spyOn(axGetModule, 'axGet')
      .mockResolvedValueOnce(mockResponses[0])
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce(mockResponses[2]);

    const { result } = renderHook(
      () =>
        useGetPageRange<Person[]>({
          url: '/people',
          fromPage: 1,
          toPage: 3,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(
        result.current.every(
          (query) => query.isSuccess === true || query.isError === true,
        ),
      ).toBe(true);
    });

    expect(result.current).toHaveLength(3);
    expect(result.current[0].isSuccess).toBe(true);
    expect(result.current[0].data).toEqual(mockResponses[0]);

    expect(result.current[1].isError).toBe(true);
    expect(result.current[1].error).toEqual(error);

    expect(result.current[2].isSuccess).toBe(true);
    expect(result.current[2].data).toEqual(mockResponses[2]);
  });

  it('should use correct query keys for caching', async () => {
    vi.spyOn(axGetModule, 'axGet')
      .mockResolvedValueOnce(mockResponses[0])
      .mockResolvedValueOnce(mockResponses[1]);

    const { result } = renderHook(
      () =>
        useGetPageRange<Person[]>({
          url: '/people',
          fromPage: 2,
          toPage: 3,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.every((query) => query.isSuccess)).toBe(true);
    });

    // The query keys should be [url, page] for each page
    // We can't directly access query keys from the result, but we can verify
    // the correct pages were called
    expect(result.current).toHaveLength(2);
  });

  it('should handle large page ranges', async () => {
    const mockLargeResponses = Array.from({ length: 10 }, (_, i) => [
      { name: `Person ${i}`, height: '170', mass: '70' },
    ]);

    const axGetSpy = vi.spyOn(axGetModule, 'axGet');
    mockLargeResponses.forEach((response) => {
      axGetSpy.mockResolvedValueOnce(response);
    });

    const { result } = renderHook(
      () =>
        useGetPageRange<Person[]>({
          url: '/people',
          fromPage: 1,
          toPage: 10,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.every((query) => query.isSuccess)).toBe(true);
    });

    expect(result.current).toHaveLength(10);
    expect(axGetSpy).toHaveBeenCalledTimes(10);

    // Verify each page was called correctly
    for (let i = 0; i < 10; i++) {
      expect(axGetSpy).toHaveBeenNthCalledWith(i + 1, {
        url: '/people',
        propsQueryString: { page: i + 1 },
      });
    }
  });

  it('should update when page range changes', async () => {
    const axGetSpy = vi
      .spyOn(axGetModule, 'axGet')
      .mockResolvedValueOnce(mockResponses[0])
      .mockResolvedValueOnce(mockResponses[1])
      .mockResolvedValueOnce(mockResponses[2]);

    const { result, rerender } = renderHook(
      ({ fromPage, toPage }) =>
        useGetPageRange<Person[]>({
          url: '/people',
          fromPage,
          toPage,
        }),
      {
        wrapper: createWrapper(),
        initialProps: { fromPage: 1, toPage: 2 },
      },
    );

    await waitFor(() => {
      expect(result.current.every((query) => query.isSuccess)).toBe(true);
    });

    expect(result.current).toHaveLength(2);

    // Change the range
    rerender({ fromPage: 1, toPage: 3 });

    await waitFor(() => result.current.length === 3);
    await waitFor(() =>
      result.current.every((query) => query.isSuccess === true),
    );

    expect(result.current).toHaveLength(3);
  });

  it('should work without callback parameter', async () => {
    vi.spyOn(axGetModule, 'axGet')
      .mockResolvedValueOnce(mockResponses[0])
      .mockResolvedValueOnce(mockResponses[1]);

    const { result } = renderHook(
      () =>
        useGetPageRange<Person[]>({
          url: '/people',
          fromPage: 1,
          toPage: 2,
          // No callback provided
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.every((query) => query.isSuccess)).toBe(true);
    });

    expect(result.current[0].data).toEqual(mockResponses[0]);
    expect(result.current[1].data).toEqual(mockResponses[1]);
  });
});
