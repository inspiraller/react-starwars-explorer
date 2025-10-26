import { PeopleObjects, Person, ResponsePeople } from '@/types/Person';
import { mergeResults } from './mergeResults';
import { arrayToObject } from './arrayToObject';

// Convert Data Response of results of Person[] to Record<string, Person>
// to put into zustand
const createPeopleObjects = (data: ResponsePeople) => {
  const results = data ? mergeResults<Person>([data]) : null;
  const peopleObjects = results
    ? (arrayToObject(results, 'name') as PeopleObjects)
    : null;
  return peopleObjects;
};
export default createPeopleObjects;
