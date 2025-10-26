import { useFilmsStore } from '@/store/zustand/films/films';

import Autocomplete, {
  SetValues,
} from '@/components/Autocomplete/Autocomplete';
import useGetAllFilms from '@/context/Tanstack/useFilms/useGetAllFilms';

export const FilmsAutocomplete = ({
  nameValue,
  setNameValue,
}: SetValues) => {
  const { isFetching, error, isSuccess } = useGetAllFilms();
  const { filmsNames } = useFilmsStore();

  return (
    <>
      <Autocomplete
        type='Film'
        nameValue={nameValue}
        setNameValue={setNameValue}
        isFetching={isFetching}
        error={error}
        isSuccess={isSuccess}
        names={filmsNames}
      />
    </>
  );
};
