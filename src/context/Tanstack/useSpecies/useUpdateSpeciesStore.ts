import { ResponseSpecies, SpeciesObjects } from '@/types/Specie';
import getNamesArray from '../dynamic/util/getNamesArray';
import { useSpeciesStore } from '@/store/zustand/species/species';
import createDetailObjects from '../dynamic/util/createDetailObjects';

export const useUpdateSpeciesStore = () => {
  const { updateSpeciesNames, updateSpeciesObjects } = useSpeciesStore();

  const callback = (response: ResponseSpecies): ResponseSpecies => {
    // On callback - CREATE zustand store of names
    const first = [response];
    const names = getNamesArray(first) as string[];
    updateSpeciesNames(names);
    const speciesObjects = createDetailObjects<SpeciesObjects>(response);
    if (speciesObjects) {
      updateSpeciesObjects(speciesObjects);
    }
    return response;
  };
  return { callback };
};
