import { Person, ResponsePeople } from '@/types/Person';

interface Props {
  name: string | null;
  response: ResponsePeople[] | null;
}
export const getPersonsData = ({ name, response }: Props): Person => {
  console.log('getPersonData', {name, response});
  return {}
  
};
