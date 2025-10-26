import { PeopleObjects } from '@/types/Person';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PeopleState {
  peopleNames: string[];
  peopleObjects: PeopleObjects;
  updatePeopleNames: (names: string[]) => void;
  updatePeopleObjects: (people: PeopleObjects) => void;
}

export const usePeopleStore = create<PeopleState>()(
  persist(
    (set) => ({
      peopleNames: [],
      peopleObjects: {},
      updatePeopleNames: (names: string[]) =>
        set((state) => {
          const toUpdate = state.peopleNames.slice().concat(names);
          return {
            peopleNames: [...new Set(toUpdate)], // ,make unique
          };
        }),

      updatePeopleObjects: (peopleObjects: PeopleObjects) =>
        set((state) => {
          const newPeople = { ...state.peopleObjects, ...peopleObjects };
          return {
            ...state,
            peopleObjects: newPeople,
          };
        }),
    }),
    {
      name: 'people-storage', // key in localStorage
    },
  ),
);
