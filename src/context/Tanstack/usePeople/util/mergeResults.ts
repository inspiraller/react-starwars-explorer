/**
 * Merges the 'results' array from an array of ResponsePeople objects
 * into a single flattened array of Person objects.
 *
 * @param responses An array of ResponsePeople objects (e.g., from paginated API calls).
 * @returns A single array containing all Person objects.
 */
export function mergeResults<Result>(
  responses: Array<{ results: any[] }>,
): Result[] {
  return responses.flatMap((response) => response.results);
}
