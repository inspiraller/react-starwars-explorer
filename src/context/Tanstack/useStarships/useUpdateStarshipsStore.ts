import { ResponseStarships, StarshipsObjects } from '@/types/Starship';
import getNamesArray from '../dynamic/util/getNamesArray';
import { useStarshipsStore } from '@/store/zustand/starships/starships';
import createDetailObjects from '../dynamic/util/createDetailObjects';

export const useUpdateStarshipsStore = () => {
  const { updateStarshipsNames, updateStarshipsObjects } = useStarshipsStore();

  const callback = (response: ResponseStarships): ResponseStarships => {
    // On callback - CREATE zustand store of names
    const first = [response];
    const names = getNamesArray(first) as string[];
    updateStarshipsNames(names);
    const starshipsObjects = createDetailObjects<StarshipsObjects>(response);
    if (starshipsObjects) {
      updateStarshipsObjects(starshipsObjects);
    }
    return response;
  };
  return { callback };
};
