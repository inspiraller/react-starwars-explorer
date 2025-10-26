import { ResponsePlanets, PlanetsObjects } from '@/types/Planet';
import getNamesArray from '../dynamic/util/getNamesArray';
import { usePlanetsStore } from '@/store/zustand/planets/planets';
import createDetailObjects from '../dynamic/util/createDetailObjects';

export const useUpdatePlanetsStore = () => {
  const { updatePlanetsNames, updatePlanetsObjects } = usePlanetsStore();

  const callback = (response: ResponsePlanets): ResponsePlanets => {
    // On callback - CREATE zustand store of names
    const first = [response];
    const names = getNamesArray(first) as string[];
    updatePlanetsNames(names);
    const planetsObjects = createDetailObjects<PlanetsObjects>(response);
    if (planetsObjects) {
      updatePlanetsObjects(planetsObjects);
    }
    return response;
  };
  return { callback };
};
