import { Activity } from 'react';

import PeopleList from './PeopleList';
import { PeopleAutocomplete } from './PeopleAutoComplete';
import CardPerson from './CardPerson';
import { usePeopleStore } from '@/store/zustand/people/people';
import { useSearchParams } from 'react-router-dom';

export const People = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const nameValue = searchParams.get('name'); // current value

  const setNameValue = (newName: string | null) => {
    // Clone current params to keep others intact
    const params = new URLSearchParams(searchParams);
    if (newName) {
      params.set('name', newName);
    } else {
      params.delete('name');
    }
    setSearchParams(params); // updates URL without reload
  };

  const { peopleObjects } = usePeopleStore();
  const person = peopleObjects[nameValue as keyof typeof peopleObjects];

  return (
    <>
      <PeopleAutocomplete nameValue={nameValue} setNameValue={setNameValue} />
      <Activity mode={nameValue && person ? 'visible' : 'hidden'}>
        <CardPerson name={nameValue} person={person} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <PeopleList />
      </Activity>
    </>
  );
};
