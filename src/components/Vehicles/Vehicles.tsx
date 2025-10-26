import { Activity } from 'react';

import VehiclesList from './VehiclesList';
import { VehiclesAutocomplete } from './VehiclesAutoComplete';

import { useVehiclesStore } from '@/store/zustand/vehicles/vehicles';
import { useParams, useSearchParams } from 'react-router-dom';
import CardDetails from '@/components/CardDetails/CardDetails';
import { Vehicle } from '@/types/Vehicle';
import { URL_API_PATH } from '@/context/Tanstack/useVehicles/const';
import useGetById from '@/context/Tanstack/dynamic/useGetById';
import { getNameAndDetailsFromId } from '@/context/Tanstack/dynamic/util/getNameAndDetailsFromId';

export const Vehicles = () => {
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

  const { vehiclesObjects } = useVehiclesStore();

  // User searched name
  let nameValue = searchParams.get('name'); // current value
  let details = vehiclesObjects[nameValue as keyof typeof vehiclesObjects];

  // If user has not searched name and id has been provided to the url
  // Make api request to url/id
  // get name, details from that.
  const { id } = useParams<{ id: string }>(); // id is a string

  const { data: dataFromId } = useGetById<Vehicle>({
    url: URL_API_PATH,
    id,
    enabled: !nameValue && typeof id !== 'undefined',
  });
  const { name: nameFromId, details: detailsFromId } =
    getNameAndDetailsFromId<Vehicle>(dataFromId);

  if (!nameValue && nameFromId && detailsFromId) {
    nameValue = nameFromId;
    details = detailsFromId;
  }

  return (
    <>
      <VehiclesAutocomplete nameValue={nameValue} setNameValue={setNameValue} />
      <Activity mode={nameValue && details ? 'visible' : 'hidden'}>
        <CardDetails<Vehicle> name={nameValue} details={details} />
      </Activity>
      <Activity mode={nameValue ? 'hidden' : 'visible'}>
        <VehiclesList />
      </Activity>
    </>
  );
};
