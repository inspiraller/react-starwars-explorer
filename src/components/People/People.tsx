import React, { Activity } from 'react';

import PeopleList from './PeopleList';
import { PeopleAutocomplete } from './PeopleAutoComplete';
import CardPerson from './CardPerson';
import { usePeopleStore } from '@/store/zustand/people/people';

export const People = () => {
  const [nameValue, setNameValue] = React.useState<string | null>(null);

  const { peopleObjects } = usePeopleStore();
  const person = peopleObjects[nameValue as keyof typeof peopleObjects];

  console.log('People ', { peopleObjects, nameValue, person });
 
  return (
    <>
      <PeopleAutocomplete value={nameValue} setValue={setNameValue} />
      <Activity mode={nameValue && person ? 'visible' : 'hidden'}>
        <CardPerson name={nameValue} person={person} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <PeopleList />
      </Activity>
    </>
  );
};
