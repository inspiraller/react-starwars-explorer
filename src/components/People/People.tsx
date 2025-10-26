import { Activity } from 'react';

import PeopleList from './PeopleList';
import { PeopleAutocomplete } from './PeopleAutoComplete';

import { usePeopleStore } from '@/store/zustand/people/people';
import { useParams, useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Person } from '@/types/Person';
import { URL_API_PATH } from '@/context/Tanstack/usePeople/const';
import useGetById from '@/context/Tanstack/dynamic/useGetById';
import { getNameAndDetailsFromId } from '@/context/Tanstack/dynamic/util/getNameAndDetailsFromId';

export const People = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  // User searched name
  let nameValue = searchParams.get('name'); // current value
  let details = peopleObjects[nameValue as keyof typeof peopleObjects];

  // If user has not searched name and id has been provided to the url
  // Make api request to url/id
  // get name, details from that.
  const { id } = useParams<{ id: string }>(); // id is a string

  const { data: dataFromId } = useGetById<Person>({
    url: URL_API_PATH,
    id,
    enabled: !nameValue && typeof id !== 'undefined',
  });
  const { name: nameFromId, details: detailsFromId } =
    getNameAndDetailsFromId<Person>(dataFromId);

  if (!nameValue && nameFromId && detailsFromId) {
    nameValue = nameFromId;
    details = detailsFromId;
  }

  return (
    <>
      <PeopleAutocomplete nameValue={nameValue} setNameValue={setNameValue} />
      <Activity mode={nameValue && details ? 'visible' : 'hidden'}>
        <CardDetails<Person> name={nameValue} details={details} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <PeopleList />
      </Activity>
    </>
  );
};
