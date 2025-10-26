import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PeopleState {
  people: string[];
  updatePeople: (names: string[]) => void;
}

export const usePeopleStore = create<PeopleState>()(
  persist(
    (set) => ({
      people: [],
      updatePeople: (names: string[]) =>
        set((state) => {
          const toUpdate = state.people.slice().concat(names);
          return {
            // make unique if reloading..
            // Note: For performance later may change this to object. people[name] = value.
            // So not having to destructure entire array every update.
            people: [...new Set(toUpdate)],
          };
        }),
    }),
    {
      name: 'people-storage', // key in localStorage
    },
  ),
);
