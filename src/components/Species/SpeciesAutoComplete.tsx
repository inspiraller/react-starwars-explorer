import { useSpeciesStore } from '@/store/zustand/species/species';

import Autocomplete, {
  SetValues,
} from '@/components/Autocomplete/Autocomplete';
import useGetAllSpecies from '@/context/Tanstack/useSpecies/useGetAllSpecies';

export const SpeciesAutocomplete = ({ nameValue, setNameValue }: SetValues) => {
  const { isFetching, error, isSuccess } = useGetAllSpecies();
  const { speciesNames } = useSpeciesStore();

  return (
    <>
      <Autocomplete
        type='Specie'
        nameValue={nameValue}
        setNameValue={setNameValue}
        isFetching={isFetching}
        error={error}
        isSuccess={isSuccess}
        names={speciesNames}
      />
    </>
  );
};
