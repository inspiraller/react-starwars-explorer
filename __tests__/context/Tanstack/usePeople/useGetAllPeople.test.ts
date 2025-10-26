import { renderHook } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';
import { usePeopleStore } from '@/store/zustand/people/people';
import useGetFirstPage from '@/context/Tanstack/dynamic/useGetFirstPage';
import { getPersonsArray } from '@/context/Tanstack/usePeople/getPersonsArray';
import useGetAllPages from '@/context/Tanstack/dynamic/useGetAllPages';
import useGetAllPeople from '@/context/Tanstack/usePeople/useGetAll';
import { URL_API_PATH } from '@/context/Tanstack/usePeople/const';

// Mocks
vi.mock('@/store/zustand/people/people', () => ({
  usePeopleStore: vi.fn(),
}));

vi.mock('@/context/Tanstack/dynamic/useGetFirstPage', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('@/context/Tanstack/dynamic/useGetAllPages', () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Fixed: Corrected the import path
vi.mock('@/context/Tanstack/usePeople/getPersonsArray', () => ({
  getPersonsArray: vi.fn(),
}));

describe('useGetAllPeople', () => {
  const updatePeople = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (usePeopleStore as unknown as Mock).mockReturnValue({ updatePeople });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call useGetFirstPage with correct params and update people on callback', () => {
    const mockResponse = { count: 20, results: [{ name: 'Luke' }] };
    const mockNames = ['Luke'];

    (useGetFirstPage as unknown as Mock).mockReturnValue({
      data: mockResponse,
    });
    (getPersonsArray as Mock).mockReturnValue(mockNames);
    // Mock queries that are still loading (not successful yet)
    (useGetAllPages as unknown as Mock).mockReturnValue([
      { isSuccess: false, isFetching: true, error: null, data: undefined },
    ]);

    const { result } = renderHook(() => useGetAllPeople());

    expect(useGetFirstPage).toHaveBeenCalledWith({
      url: URL_API_PATH,
      callback: expect.any(Function),
    });

    // Simulate callback manually
    const [[firstArgs]] = (useGetFirstPage as Mock).mock.calls;
    const cb = firstArgs.callback;
    cb(mockResponse);

    expect(getPersonsArray).toHaveBeenCalledWith([mockResponse]);
    expect(updatePeople).toHaveBeenCalledWith(mockNames);
    expect(result.current.data).toBeNull();
    expect(result.current.isSuccess).toBe(false);
  });

  it('should compute totalPages correctly and call useGetAllPages', () => {
    const mockResponse = { count: 25, results: [] };
    (useGetFirstPage as Mock).mockReturnValue({ data: mockResponse });
    (useGetAllPages as Mock).mockReturnValue([]);

    renderHook(() => useGetAllPeople());

    // totalPages = ceil(25 / 10) = 3
    expect(useGetAllPages).toHaveBeenCalledWith({
      url: URL_API_PATH,
      totalPages: 3,
      callback: expect.any(Function),
    });
  });

  it('should return allSuccess = true and aggregate data when all queries succeed', () => {
    const mockResponse = { count: 10, results: [{ name: 'Leia' }] };
    (useGetFirstPage as Mock).mockReturnValue({ data: mockResponse });

    const mockResults = [
      { isSuccess: true, isFetching: false, error: null, data: { id: 1 } },
      { isSuccess: true, isFetching: false, error: null, data: { id: 2 } },
    ];
    (useGetAllPages as Mock).mockReturnValue(mockResults);

    const { result } = renderHook(() => useGetAllPeople());

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([{ id: 1 }, { id: 2 }]);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('should handle when some queries are fetching or failed', () => {
    const mockResponse = { count: 10, results: [] };
    (useGetFirstPage as Mock).mockReturnValue({ data: mockResponse });

    const mockResults = [
      { isSuccess: false, isFetching: true, error: null },
      { isSuccess: false, isFetching: false, error: new Error('boom') },
    ];
    (useGetAllPages as Mock).mockReturnValue(mockResults);

    const { result } = renderHook(() => useGetAllPeople());

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.isFetching).toBe(true);
    expect(result.current.error).toBe(true);
  });

  it('should handle missing dataFirstPage gracefully', () => {
    (useGetFirstPage as Mock).mockReturnValue({ data: undefined });
    (useGetAllPages as Mock).mockReturnValue([]);

    renderHook(() => useGetAllPeople());

    expect(useGetAllPages).toHaveBeenCalledWith({
      url: URL_API_PATH,
      totalPages: 0,
      callback: expect.any(Function),
    });
  });
});
