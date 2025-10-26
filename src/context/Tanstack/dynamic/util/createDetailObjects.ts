import { mergeResults } from './mergeResults';
import { arrayToObject } from './arrayToObject';

// Convert Data Response of results of Person[] to Record<string, Person>
// to put into zustand
const createDetailObjects = <Objects>(data: { results: any[] }) => {
  const results = data ? mergeResults([data]) : null;
  const detailObjects = results
    ? (arrayToObject(results, 'name') as Objects)
    : null;
  return detailObjects;
};
export default createDetailObjects;
