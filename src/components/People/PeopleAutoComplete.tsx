import useGetAllPeople from '@/context/Tanstack/usePeople/useGetAllPeople';
import { usePeopleStore } from '@/store/zustand/people/people';

import React from 'react';

import Autocomplete from '@/components/Autocomplete/Autocomplete';

interface Props {
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  value: string | null;
}

export const PeopleAutocomplete = ({ value, setValue }: Props) => {
  const { isFetching, error, isSuccess } = useGetAllPeople();
  const { peopleNames } = usePeopleStore();

  return (
    <>
      <Autocomplete
        type='Person'
        value={value}
        setValue={setValue}
        isFetching={isFetching}
        error={error}
        isSuccess={isSuccess}
        names={peopleNames}
      />
    </>
  );
};
