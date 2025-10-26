import { SpeciesObjects } from '@/types/Specie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpeciesState {
  speciesNames: string[];
  speciesObjects: SpeciesObjects;
  updateSpeciesNames: (names: string[]) => void;
  updateSpeciesObjects: (species: SpeciesObjects) => void;
}

export const useSpeciesStore = create<SpeciesState>()(
  persist(
    (set) => ({
      speciesNames: [],
      speciesObjects: {},
      updateSpeciesNames: (names: string[]) =>
        set((state) => {
          const toUpdate = state.speciesNames.slice().concat(names);
          return {
            speciesNames: [...new Set(toUpdate)], // ,make unique
          };
        }),

      updateSpeciesObjects: (speciesObjects: SpeciesObjects) =>
        set((state) => {
          const newSpecies = {
            ...state.speciesObjects,
            ...speciesObjects,
          };
          return {
            ...state,
            speciesObjects: newSpecies,
          };
        }),
    }),
    {
      name: 'species-storage', // key in localStorage
    },
  ),
);
