import { Activity } from 'react';

import PlanetsList from './PlanetsList';
import { PlanetsAutocomplete } from './PlanetsAutoComplete';

import { usePlanetsStore } from '@/store/zustand/planets/planets';
import { useParams, useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Planet } from '@/types/Planet';
import { URL_API_PATH } from '@/context/Tanstack/usePlanets/const';
import useGetById from '@/context/Tanstack/dynamic/useGetById';
import { getNameAndDetailsFromId } from '@/context/Tanstack/dynamic/util/getNameAndDetailsFromId';

export const Planets = () => {
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

  const { planetsObjects } = usePlanetsStore();

  // User searched name
  let nameValue = searchParams.get('name'); // current value
  let details = planetsObjects[nameValue as keyof typeof planetsObjects];

  // If user has not searched name and id has been provided to the url
  // Make api request to url/id
  // get name, details from that.
  const { id } = useParams<{ id: string }>(); // id is a string

  const { data: dataFromId } = useGetById<Planet>({
    url: URL_API_PATH,
    id,
    enabled: !nameValue && typeof id !== 'undefined',
  });
  const { name: nameFromId, details: detailsFromId } =
    getNameAndDetailsFromId<Planet>(dataFromId);

  if (!nameValue && nameFromId && detailsFromId) {
    nameValue = nameFromId;
    details = detailsFromId;
  }

  return (
    <>
      <PlanetsAutocomplete nameValue={nameValue} setNameValue={setNameValue} />
      <Activity mode={nameValue && details ? 'visible' : 'hidden'}>
        <CardDetails<Planet> name={nameValue} details={details} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <PlanetsList />
      </Activity>
    </>
  );
};
