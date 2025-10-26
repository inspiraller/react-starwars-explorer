import useGetAllPeople from '@/context/Tanstack/usePeople/useGetAllPeople';
import { usePeopleStore } from '@/store/zustand/people/people';

import React from 'react';

import { Autocomplete } from '@/components/Autocomplete/Autocomplete';
import { mergeResults } from '@/context/Tanstack/usePeople/mergeResults';
import { type PeopleObjects, Person } from '@/types/Person';
import { arrayToObject } from '@/context/Tanstack/usePeople/arrayToObject';
import PeopleList from './PeopleList';

export const People = () => {
  const [nameValue, setNameValue] = React.useState<string | null>(null);
  const { isFetching, error, isSuccess, data } = useGetAllPeople();
  const { people: names } = usePeopleStore();

  const results = data ? mergeResults<Person>(data) : null;
  const people = results
    ? (arrayToObject(results, 'name') as PeopleObjects)
    : null;

  return (
    <>
      <Autocomplete
        type='Person'
        value={nameValue}
        setValue={setNameValue}
        isFetching={isFetching}
        error={error}
        isSuccess={isSuccess}
        names={names}
      />
      <PeopleList people={people} />
    </>
  );
};
