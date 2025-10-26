import { PeopleObjects, ResponsePeople } from '@/types/Person';
import getNamesArray from '../dynamic/util/getNamesArray';
import { usePeopleStore } from '@/store/zustand/people/people';
import createDetailObjects from '../dynamic/util/createDetailObjects';

export const useUpdatePeopleStore = () => {
  const { updatePeopleNames, updatePeopleObjects } = usePeopleStore();

  const callback = (response: ResponsePeople): ResponsePeople => {
    // On callback - CREATE zustand store of names
    const first = [response];
    const names = getNamesArray(first) as string[];
    updatePeopleNames(names);
    const peopleObjects = createDetailObjects<PeopleObjects>(response);
    if (peopleObjects) {
      updatePeopleObjects(peopleObjects);
    }
    return response;
  };
  return { callback };
};
