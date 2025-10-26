import { StarshipsObjects } from '@/types/Starship';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StarshipsState {
  starshipsNames: string[];
  starshipsObjects: StarshipsObjects;
  updateStarshipsNames: (names: string[]) => void;
  updateStarshipsObjects: (starships: StarshipsObjects) => void;
}

export const useStarshipsStore = create<StarshipsState>()(
  persist(
    (set) => ({
      starshipsNames: [],
      starshipsObjects: {},
      updateStarshipsNames: (names: string[]) =>
        set((state) => {
          const toUpdate = state.starshipsNames.slice().concat(names);
          return {
            starshipsNames: [...new Set(toUpdate)], // ,make unique
          };
        }),

      updateStarshipsObjects: (starshipsObjects: StarshipsObjects) =>
        set((state) => {
          const newStarships = {
            ...state.starshipsObjects,
            ...starshipsObjects,
          };
          return {
            ...state,
            starshipsObjects: newStarships,
          };
        }),
    }),
    {
      name: 'starships-storage', // key in localStorage
    },
  ),
);
