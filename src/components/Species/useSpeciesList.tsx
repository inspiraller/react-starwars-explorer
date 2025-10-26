import React, { useState } from 'react';
import {
  useTheme,
  useMediaQuery, // Import CardHeader
} from '@mui/material';
import type { SpeciesObjects, ResponseSpecies } from '@/types/Specie';

import useGetPage from '@/context/Tanstack/dynamic/useGetPage';
import { DISPLAY_ITEMS_PER_PAGE } from '@/context/Tanstack/dynamic/util/const';
import { getTotalPages } from '@/context/Tanstack/dynamic/getTotalPages';

import { useUpdateSpeciesStore } from '@/context/Tanstack/useSpecies/useUpdateSpeciesStore';
import createDetailObjects from '@/context/Tanstack/dynamic/util/createDetailObjects';
import { URL_API_PATH } from '@/context/Tanstack/useSpecies/const';

const useSpeciesList = () => {
  const { callback } = useUpdateSpeciesStore();

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
  const { isFetching, error, data } = useGetPage<ResponseSpecies>({
    url: URL_API_PATH,
    page,
    callback,
  });

  const totalPages = data
    ? getTotalPages(data?.count, DISPLAY_ITEMS_PER_PAGE)
    : 0;

  const pageSpeciesObjects = data
    ? (createDetailObjects(data) as SpeciesObjects)
    : {};

  const speciesEntries = pageSpeciesObjects
    ? Object.entries(pageSpeciesObjects)
    : [];

  const isDisplay = speciesEntries.length > 0 && !isFetching;

  const totalCount = data?.count;

  return {
    isDisplay,
    speciesEntries,
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

export default useSpeciesList;
