import { PeopleObjects, Person, ResponsePeople } from '@/types/Person';
import { mergeResults } from './mergeResults';
import { arrayToObject } from './arrayToObject';

const createPropleObjects = (data: ResponsePeople) => {
  const results = data ? mergeResults<Person>([data]) : null;
  const peopleObjects = results
    ? (arrayToObject(results, 'name') as PeopleObjects)
    : null;
  return peopleObjects;
};
export default createPropleObjects;
