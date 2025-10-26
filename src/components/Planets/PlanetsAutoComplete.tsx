import { usePlanetsStore } from '@/store/zustand/planets/planets';

import Autocomplete, {
  SetValues,
} from '@/components/Autocomplete/Autocomplete';
import useGetAllPlanets from '@/context/Tanstack/usePlanets/useGetAllPlanets';

export const PlanetsAutocomplete = ({ nameValue, setNameValue }: SetValues) => {
  const { isFetching, error, isSuccess } = useGetAllPlanets();
  const { planetsNames } = usePlanetsStore();

  return (
    <>
      <Autocomplete
        type='Planet'
        nameValue={nameValue}
        setNameValue={setNameValue}
        isFetching={isFetching}
        error={error}
        isSuccess={isSuccess}
        names={planetsNames}
      />
    </>
  );
};
