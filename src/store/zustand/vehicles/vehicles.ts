import { VehiclesObjects } from '@/types/Vehicle';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VehiclesState {
  vehiclesNames: string[];
  vehiclesObjects: VehiclesObjects;
  updateVehiclesNames: (names: string[]) => void;
  updateVehiclesObjects: (vehicles: VehiclesObjects) => void;
}

export const useVehiclesStore = create<VehiclesState>()(
  persist(
    (set) => ({
      vehiclesNames: [],
      vehiclesObjects: {},
      updateVehiclesNames: (names: string[]) =>
        set((state) => {
          const toUpdate = state.vehiclesNames.slice().concat(names);
          return {
            vehiclesNames: [...new Set(toUpdate)], // ,make unique
          };
        }),

      updateVehiclesObjects: (vehiclesObjects: VehiclesObjects) =>
        set((state) => {
          const newVehicles = {
            ...state.vehiclesObjects,
            ...vehiclesObjects,
          };
          return {
            ...state,
            vehiclesObjects: newVehicles,
          };
        }),
    }),
    {
      name: 'vehicles-storage', // key in localStorage
    },
  ),
);
