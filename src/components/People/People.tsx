import useGetAllPeople from '@/context/Tanstack/usePeople/useGetAll';

export const People = () => {
  useGetAllPeople(); // will populate zustand people

  return <></>;
};
