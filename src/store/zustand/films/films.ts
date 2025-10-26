import { FilmsObjects } from '@/types/Film';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilmsState {
  filmsNames: string[];
  filmsObjects: FilmsObjects;
  updateFilmsNames: (names: string[]) => void;
  updateFilmsObjects: (films: FilmsObjects) => void;
}

export const useFilmsStore = create<FilmsState>()(
  persist(
    (set) => ({
      filmsNames: [],
      filmsObjects: {},
      updateFilmsNames: (names: string[]) =>
        set((state) => {
          const toUpdate = state.filmsNames.slice().concat(names);
          return {
            filmsNames: [...new Set(toUpdate)], // ,make unique
          };
        }),

      updateFilmsObjects: (filmsObjects: FilmsObjects) =>
        set((state) => {
          const newFilms = {
            ...state.filmsObjects,
            ...filmsObjects,
          };
          return {
            ...state,
            filmsObjects: newFilms,
          };
        }),
    }),
    {
      name: 'films-storage', // key in localStorage
    },
  ),
);
