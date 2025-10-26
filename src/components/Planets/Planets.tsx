import { Activity } from 'react';

import PlanetsList from './PlanetsList';
import { PlanetsAutocomplete } from './PlanetsAutoComplete';

import { usePlanetsStore } from '@/store/zustand/planets/planets';
import { useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Planet } from '@/types/Planet';

export const Planets = () => {
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

  const { planetsObjects } = usePlanetsStore();
  const planet = planetsObjects[nameValue as keyof typeof planetsObjects];

  return (
    <>
      <PlanetsAutocomplete nameValue={nameValue} setNameValue={setNameValue} />
      <Activity mode={nameValue && planet ? 'visible' : 'hidden'}>
        <CardDetails<Planet> name={nameValue} details={planet} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <PlanetsList />
      </Activity>
    </>
  );
};
