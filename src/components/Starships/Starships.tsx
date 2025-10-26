import { Activity } from 'react';

import StarshipsList from './StarshipsList';
import { StarshipsAutocomplete } from './StarshipsAutoComplete';

import { useStarshipsStore } from '@/store/zustand/starships/starships';
import { useParams, useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Starship } from '@/types/Starship';
import { URL_API_PATH } from '@/context/Tanstack/useStarships/const';
import useGetById from '@/context/Tanstack/dynamic/useGetById';
import { getNameAndDetailsFromId } from '@/context/Tanstack/dynamic/util/getNameAndDetailsFromId';

export const Starships = () => {
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

  const { starshipsObjects } = useStarshipsStore();

  // User searched name
  let nameValue = searchParams.get('name'); // current value
  let details = starshipsObjects[nameValue as keyof typeof starshipsObjects];

  // If user has not searched name and id has been provided to the url
  // Make api request to url/id
  // get name, details from that.
  const { id } = useParams<{ id: string }>(); // id is a string

  const { data: dataFromId } = useGetById<Starship>({
    url: URL_API_PATH,
    id,
    enabled: !nameValue && typeof id !== 'undefined',
  });
  const { name: nameFromId, details: detailsFromId } =
    getNameAndDetailsFromId<Starship>(dataFromId);

  if (!nameValue && nameFromId && detailsFromId) {
    nameValue = nameFromId;
    details = detailsFromId;
  }

  return (
    <>
      <StarshipsAutocomplete
        nameValue={nameValue}
        setNameValue={setNameValue}
      />
      <Activity mode={nameValue && details ? 'visible' : 'hidden'}>
        <CardDetails<Starship> name={nameValue} details={details} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <StarshipsList />
      </Activity>
    </>
  );
};
