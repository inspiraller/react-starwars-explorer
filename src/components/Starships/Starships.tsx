import { Activity } from 'react';

import StarshipsList from './StarshipsList';
import { StarshipsAutocomplete } from './StarshipsAutoComplete';

import { useStarshipsStore } from '@/store/zustand/starships/starships';
import { useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Starship } from '@/types/Starship';

export const Starships = () => {
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

  const { starshipsObjects } = useStarshipsStore();
  const starship = starshipsObjects[nameValue as keyof typeof starshipsObjects];

  return (
    <>
      <StarshipsAutocomplete
        nameValue={nameValue}
        setNameValue={setNameValue}
      />
      <Activity mode={nameValue && starship ? 'visible' : 'hidden'}>
        <CardDetails<Starship> name={nameValue} details={starship} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <StarshipsList />
      </Activity>
    </>
  );
};
