import { Activity } from 'react';

import SpeciesList from './SpeciesList';
import { SpeciesAutocomplete } from './SpeciesAutoComplete';

import { useSpeciesStore } from '@/store/zustand/species/species';
import { useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Specie } from '@/types/Specie';

export const Species = () => {
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

  const { speciesObjects } = useSpeciesStore();
  const specie = speciesObjects[nameValue as keyof typeof speciesObjects];

  return (
    <>
      <SpeciesAutocomplete nameValue={nameValue} setNameValue={setNameValue} />
      <Activity mode={nameValue && specie ? 'visible' : 'hidden'}>
        <CardDetails<Specie> name={nameValue} details={specie} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <SpeciesList />
      </Activity>
    </>
  );
};
