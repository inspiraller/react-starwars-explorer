import React, { useState } from 'react';
import {
  useTheme,
  useMediaQuery, // Import CardHeader
} from '@mui/material';
import type { PlanetsObjects, ResponsePlanets } from '@/types/Planet';

import useGetPage from '@/context/Tanstack/dynamic/useGetPage';
import { DISPLAY_ITEMS_PER_PAGE } from '@/context/Tanstack/dynamic/util/const';
import { getTotalPages } from '@/context/Tanstack/dynamic/getTotalPages';

import { useUpdatePlanetsStore } from '@/context/Tanstack/usePlanets/useUpdatePlanetsStore';
import createDetailObjects from '@/context/Tanstack/dynamic/util/createDetailObjects';
import { URL_API_PATH } from '@/context/Tanstack/usePlanets/const';

const usePlanetsList = () => {
  const { callback } = useUpdatePlanetsStore();

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
  const { isFetching, error, data } = useGetPage<ResponsePlanets>({
    url: URL_API_PATH,
    page,
    callback,
  });

  const totalPages = data
    ? getTotalPages(data?.count, DISPLAY_ITEMS_PER_PAGE)
    : 0;

  const pagePlanetsObjects = data
    ? (createDetailObjects(data) as PlanetsObjects)
    : {};

  const planetsEntries = pagePlanetsObjects
    ? Object.entries(pagePlanetsObjects)
    : [];

  const isDisplay = planetsEntries.length > 0 && !isFetching;

  const totalCount = data?.count;

  return {
    isDisplay,
    planetsEntries,
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

export default usePlanetsList;
