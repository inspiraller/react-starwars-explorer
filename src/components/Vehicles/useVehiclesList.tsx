import React, { useState } from 'react';
import {
  useTheme,
  useMediaQuery, // Import CardHeader
} from '@mui/material';
import type { VehiclesObjects, ResponseVehicles } from '@/types/Vehicle';

import useGetPage from '@/context/Tanstack/dynamic/useGetPage';
import { DISPLAY_ITEMS_PER_PAGE } from '@/context/Tanstack/dynamic/util/const';
import { getTotalPages } from '@/context/Tanstack/dynamic/getTotalPages';

import { useUpdateVehiclesStore } from '@/context/Tanstack/useVehicles/useUpdateVehiclesStore';
import createDetailObjects from '@/context/Tanstack/dynamic/util/createDetailObjects';
import { URL_API_PATH } from '@/context/Tanstack/useVehicles/const';

const useVehiclesList = () => {
  const { callback } = useUpdateVehiclesStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // local states
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DISPLAY_ITEMS_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePerPageChange = (event: { target: { value: any } }) => {
    setPerPage(event.target.value as number);
    setPage(1); // reset to first page when changing count
  };

  // Tanstack ... get data.
  const { isFetching, error, data } = useGetPage<ResponseVehicles>({
    url: URL_API_PATH,
    page,
    callback,
  });

  const totalPages = data
    ? getTotalPages(data?.count, DISPLAY_ITEMS_PER_PAGE)
    : 0;

  const pageVehiclesObjects = data
    ? (createDetailObjects(data) as VehiclesObjects)
    : {};

  const vehiclesEntries = pageVehiclesObjects
    ? Object.entries(pageVehiclesObjects)
    : [];

  const isDisplay = vehiclesEntries.length > 0 && !isFetching;

  const totalCount = data?.count;

  return {
    isDisplay,
    vehiclesEntries,
    totalPages,
    error,
    isFetching,
    isMobile,
    perPage,
    page,
    totalCount,
    handlePageChange,
    handlePerPageChange,
  };
};

export default useVehiclesList;
