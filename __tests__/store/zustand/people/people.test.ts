import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage before importing the store
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('usePeopleStore', () => {
  beforeEach(() => {
    vi.resetModules();
    window.localStorage.clear();
  });

  it('initializes with empty people array', async () => {
    const { usePeopleStore } = await import('@/store/zustand/people/people');
    const people = usePeopleStore.getState().people;
    expect(people).toEqual([]);
  });

  it('adds new unique people', async () => {
    const { usePeopleStore } = await import('@/store/zustand/people/people');
    usePeopleStore.getState().updatePeople(['Alice', 'Bob']);
    expect(usePeopleStore.getState().people).toEqual(['Alice', 'Bob']);

    // Add duplicates
    usePeopleStore.getState().updatePeople(['Bob', 'Charlie']);
    expect(usePeopleStore.getState().people).toEqual([
      'Alice',
      'Bob',
      'Charlie',
    ]);
  });

  it('persists state to localStorage', async () => {
    const { usePeopleStore } = await import('@/store/zustand/people/people');
    usePeopleStore.getState().updatePeople(['Alice']);
    const stored = window.localStorage.getItem('people-storage');
    expect(stored).toContain('Alice');
  });

  it('rehydrates from localStorage', async () => {
    // Manually populate storage
    window.localStorage.setItem(
      'people-storage',
      JSON.stringify({ state: { people: ['Dave'] } }),
    );

    // Re-import to simulate reload
    const { usePeopleStore } = await import('@/store/zustand/people/people');
    expect(usePeopleStore.getState().people).toEqual(['Dave']);
  });
});
