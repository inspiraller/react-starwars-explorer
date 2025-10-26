import { ResponsePeople } from '@/types/Person';
import { getPersonsArray } from './getPersonsArray';
import { usePeopleStore } from '@/store/zustand/people/people';
import createPeopleObjects from './createPeopleObjects';

export const useUpdatePeopleStore = () => {
  const { updatePeopleNames, updatePeopleObjects } = usePeopleStore();

  const callback = (response: ResponsePeople): ResponsePeople => {
    // On callback - CREATE zustand store of names
    const first = [response];
    const names = getPersonsArray(first) as string[];
    updatePeopleNames(names);
    const peopleObjects = createPeopleObjects(response);
    if (peopleObjects) {
      updatePeopleObjects(peopleObjects);
    }
    return response;
  };
  return { callback };
};
