import { useGetPeople } from '@/service/usePeople';

export const People = () => {
  const { data, isSuccess, error, isPending } = useGetPeople();

  console.log('data=', data);
  return <></>;
};
