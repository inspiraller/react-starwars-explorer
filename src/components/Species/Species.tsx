import { Activity } from 'react';

import SpeciesList from './SpeciesList';
import { SpeciesAutocomplete } from './SpeciesAutoComplete';

import { useSpeciesStore } from '@/store/zustand/species/species';
import { useParams, useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Specie } from '@/types/Specie';
import { URL_API_PATH } from '@/context/Tanstack/useSpecies/const';
import useGetById from '@/context/Tanstack/dynamic/useGetById';
import { getNameAndDetailsFromId } from '@/context/Tanstack/dynamic/util/getNameAndDetailsFromId';

export const Species = () => {
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

  const { speciesObjects } = useSpeciesStore();

  // User searched name
  let nameValue = searchParams.get('name'); // current value
  let details = speciesObjects[nameValue as keyof typeof speciesObjects];

  // If user has not searched name and id has been provided to the url
  // Make api request to url/id
  // get name, details from that.
  const { id } = useParams<{ id: string }>(); // id is a string

  const { data: dataFromId } = useGetById<Specie>({
    url: URL_API_PATH,
    id,
    enabled: !nameValue && typeof id !== 'undefined',
  });
  const { name: nameFromId, details: detailsFromId } =
    getNameAndDetailsFromId<Specie>(dataFromId);

  if (!nameValue && nameFromId && detailsFromId) {
    nameValue = nameFromId;
    details = detailsFromId;
  }

  return (
    <>
      <SpeciesAutocomplete nameValue={nameValue} setNameValue={setNameValue} />
      <Activity mode={nameValue && details ? 'visible' : 'hidden'}>
        <CardDetails<Specie> name={nameValue} details={details} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <SpeciesList />
      </Activity>
    </>
  );
};
