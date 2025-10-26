import { mergeResults } from './mergeResults';
import { arrayToObject } from './arrayToObject';

// Convert Data Response of results of Person[] to Record<string, Person>
// to put into zustand
const createDetailObjects = <Objects>(data: { results: any[] }) => {
  const results = data ? mergeResults([data]) : null;

  // Films have title. everything else has name (people, starships, vehicles, species etc...)
  const key = results?.[0]?.hasOwnProperty('title') ? 'title' : 'name';
  const detailObjects = results
    ? (arrayToObject(results, key) as Objects)
    : null;
  return detailObjects;
};
export default createDetailObjects;
