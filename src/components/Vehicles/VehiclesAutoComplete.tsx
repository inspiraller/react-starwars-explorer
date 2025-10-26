import { useVehiclesStore } from '@/store/zustand/vehicles/vehicles';

import Autocomplete, {
  SetValues,
} from '@/components/Autocomplete/Autocomplete';
import useGetAllVehicles from '@/context/Tanstack/useVehicles/useGetAllVehicles';

export const VehiclesAutocomplete = ({
  nameValue,
  setNameValue,
}: SetValues) => {
  const { isFetching, error, isSuccess } = useGetAllVehicles();
  const { vehiclesNames } = useVehiclesStore();

  return (
    <>
      <Autocomplete
        type='Vehicle'
        nameValue={nameValue}
        setNameValue={setNameValue}
        isFetching={isFetching}
        error={error}
        isSuccess={isSuccess}
        names={vehiclesNames}
      />
    </>
  );
};
