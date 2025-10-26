import { Activity } from 'react';

import VehiclesList from './VehiclesList';
import { VehiclesAutocomplete } from './VehiclesAutoComplete';

import { useVehiclesStore } from '@/store/zustand/vehicles/vehicles';
import { useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Vehicle } from '@/types/Vehicle';

export const Vehicles = () => {
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

  const { vehiclesObjects } = useVehiclesStore();
  const vehicle = vehiclesObjects[nameValue as keyof typeof vehiclesObjects];

  return (
    <>
      <VehiclesAutocomplete nameValue={nameValue} setNameValue={setNameValue} />
      <Activity mode={nameValue && vehicle ? 'visible' : 'hidden'}>
        <CardDetails<Vehicle> name={nameValue} details={vehicle} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <VehiclesList />
      </Activity>
    </>
  );
};
