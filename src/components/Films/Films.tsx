import { Activity } from 'react';

import FilmsList from './FilmsList';
import { FilmsAutocomplete } from './FilmsAutoComplete';

import { useFilmsStore } from '@/store/zustand/films/films';
import { useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Film } from '@/types/Film';

export const Films = () => {
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

  const { filmsObjects } = useFilmsStore();
  const film = filmsObjects[nameValue as keyof typeof filmsObjects];

  return (
    <>
      <FilmsAutocomplete nameValue={nameValue} setNameValue={setNameValue} />
      <Activity mode={nameValue && film ? 'visible' : 'hidden'}>
        <CardDetails<Film> name={nameValue} details={film} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <FilmsList />
      </Activity>
    </>
  );
};
