import { ResponseFilms, FilmsObjects } from '@/types/Film';
import getNamesArray from '../dynamic/util/getNamesArray';
import { useFilmsStore } from '@/store/zustand/films/films';
import createDetailObjects from '../dynamic/util/createDetailObjects';

export const useUpdateFilmsStore = () => {
  const { updateFilmsNames, updateFilmsObjects } = useFilmsStore();

  const callback = (response: ResponseFilms): ResponseFilms => {
    // On callback - CREATE zustand store of names
    const first = [response];
    const names = getNamesArray(first) as string[];
    updateFilmsNames(names);
    const filmsObjects = createDetailObjects<FilmsObjects>(response);
    if (filmsObjects) {
      updateFilmsObjects(filmsObjects);
    }
    return response;
  };
  return { callback };
};
