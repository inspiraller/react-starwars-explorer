import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PeopleState {
  people: string[];
  createPeople: (names: string[]) => void;
  updatePeople: (names: string[]) => void;
}

export const usePeopleStore = create<PeopleState>()(
  persist(
    (set) => ({
      people: [],
      createPeople: (names) => set({ people: names }),
      updatePeople: (names: string[]) =>
        set((state) => {
          const toUpdate = state.people.slice().concat(names);
          return {
            people: toUpdate,
          };
        }),
    }),
    {
      name: 'people-storage', // key in localStorage
    },
  ),
);
