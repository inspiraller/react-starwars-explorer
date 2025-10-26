// Create an array of persons names
const getNamesArray = <T extends { results: Array<{ name: string }> }>(
  result: T[] | null,
) => {
  return result?.reduce((acc, cur) => {
    cur.results.forEach((person) => {
      acc.push(person.name);
    });
    return acc;
  }, [] as string[]);
};
export default getNamesArray;
