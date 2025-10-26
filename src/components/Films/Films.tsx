import { Activity } from 'react';

import FilmsList from './FilmsList';
import { FilmsAutocomplete } from './FilmsAutoComplete';

import { useFilmsStore } from '@/store/zustand/films/films';
import { useParams, useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Film } from '@/types/Film';
import { URL_API_PATH } from '@/context/Tanstack/useFilms/const';
import useGetById from '@/context/Tanstack/dynamic/useGetById';
import { getNameAndDetailsFromId } from '@/context/Tanstack/dynamic/util/getNameAndDetailsFromId';

export const Films = () => {
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

  const { filmsObjects } = useFilmsStore();

  // User searched name
  let nameValue = searchParams.get('name'); // current value
  let details = filmsObjects[nameValue as keyof typeof filmsObjects];

  // If user has not searched name and id has been provided to the url
  // Make api request to url/id
  // get name, details from that.
  const { id } = useParams<{ id: string }>(); // id is a string

  const { data: dataFromId } = useGetById<Film>({
    url: URL_API_PATH,
    id,
    enabled: !nameValue && typeof id !== 'undefined',
  });
  const { name: nameFromId, details: detailsFromId } =
    getNameAndDetailsFromId<Film>(dataFromId);

  if (!nameValue && nameFromId && detailsFromId) {
    nameValue = nameFromId;
    details = detailsFromId;
  }

  return (
    <>
      <FilmsAutocomplete nameValue={nameValue} setNameValue={setNameValue} />
      <Activity mode={nameValue && details ? 'visible' : 'hidden'}>
        <CardDetails<Film> name={nameValue} details={details} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <FilmsList />
      </Activity>
    </>
  );
};
