// Create an array of persons names
const getNamesArray = <
  T extends { results: Array<{ name?: string; title?: string }> },
>(
  result: T[] | null,
) => {
  return result?.reduce((acc, cur) => {
    cur.results.forEach((person) => {
      const { name, title } = person; // Films have title. all other items have names (people, starships, vehicles, species)
      acc.push((name ?? title) as string);
    });
    return acc;
  }, [] as string[]);
};
export default getNamesArray;
