import { PlanetsObjects } from '@/types/Planet';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlanetsState {
  planetsNames: string[];
  planetsObjects: PlanetsObjects;
  updatePlanetsNames: (names: string[]) => void;
  updatePlanetsObjects: (planets: PlanetsObjects) => void;
}

export const usePlanetsStore = create<PlanetsState>()(
  persist(
    (set) => ({
      planetsNames: [],
      planetsObjects: {},
      updatePlanetsNames: (names: string[]) =>
        set((state) => {
          const toUpdate = state.planetsNames.slice().concat(names);
          return {
            planetsNames: [...new Set(toUpdate)], // ,make unique
          };
        }),

      updatePlanetsObjects: (planetsObjects: PlanetsObjects) =>
        set((state) => {
          const newPlanets = {
            ...state.planetsObjects,
            ...planetsObjects,
          };
          return {
            ...state,
            planetsObjects: newPlanets,
          };
        }),
    }),
    {
      name: 'planets-storage', // key in localStorage
    },
  ),
);
