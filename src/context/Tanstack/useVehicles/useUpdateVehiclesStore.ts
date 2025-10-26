import { ResponseVehicles, VehiclesObjects } from '@/types/Vehicle';
import getNamesArray from '../dynamic/util/getNamesArray';
import { useVehiclesStore } from '@/store/zustand/vehicles/vehicles';
import createDetailObjects from '../dynamic/util/createDetailObjects';

export const useUpdateVehiclesStore = () => {
  const { updateVehiclesNames, updateVehiclesObjects } = useVehiclesStore();

  const callback = (response: ResponseVehicles): ResponseVehicles => {
    // On callback - CREATE zustand store of names
    const first = [response];
    const names = getNamesArray(first) as string[];
    updateVehiclesNames(names);
    const vehiclesObjects = createDetailObjects<VehiclesObjects>(response);
    if (vehiclesObjects) {
      updateVehiclesObjects(vehiclesObjects);
    }
    return response;
  };
  return { callback };
};
