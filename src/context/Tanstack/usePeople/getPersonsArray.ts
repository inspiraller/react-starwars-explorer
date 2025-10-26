import { ResponsePeople } from '@/types/Person';

export const getPersonsArray = (result: ResponsePeople[] | null) => {
  return result?.reduce((acc, cur) => {
    cur.results.forEach((person) => {
      acc.push(person.name);
    });
    return acc;
  }, [] as string[]);
};
