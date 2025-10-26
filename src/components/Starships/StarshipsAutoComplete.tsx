import { useStarshipsStore } from '@/store/zustand/starships/starships';

import Autocomplete, {
  SetValues,
} from '@/components/Autocomplete/Autocomplete';
import useGetAllStarships from '@/context/Tanstack/useStarships/useGetAllStarships';

export const StarshipsAutocomplete = ({
  nameValue,
  setNameValue,
}: SetValues) => {
  const { isFetching, error, isSuccess } = useGetAllStarships();
  const { starshipsNames } = useStarshipsStore();

  return (
    <>
      <Autocomplete
        type='Starship'
        nameValue={nameValue}
        setNameValue={setNameValue}
        isFetching={isFetching}
        error={error}
        isSuccess={isSuccess}
        names={starshipsNames}
      />
    </>
  );
};
