import React, { useState } from 'react';
import {
  useTheme,
  useMediaQuery, // Import CardHeader
} from '@mui/material';
import type { StarshipsObjects, ResponseStarships } from '@/types/Starship';

import useGetPage from '@/context/Tanstack/dynamic/useGetPage';
import { DISPLAY_ITEMS_PER_PAGE } from '@/context/Tanstack/dynamic/util/const';
import { getTotalPages } from '@/context/Tanstack/dynamic/getTotalPages';

import { useUpdateStarshipsStore } from '@/context/Tanstack/useStarships/useUpdateStarshipsStore';
import createDetailObjects from '@/context/Tanstack/dynamic/util/createDetailObjects';
import { URL_API_PATH } from '@/context/Tanstack/useStarships/const';

const useStarshipsList = () => {
  const { callback } = useUpdateStarshipsStore();

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
  const { isFetching, error, data } = useGetPage<ResponseStarships>({
    url: URL_API_PATH,
    page,
    callback,
  });

  const totalPages = data
    ? getTotalPages(data?.count, DISPLAY_ITEMS_PER_PAGE)
    : 0;

  const pageStarshipsObjects = data
    ? (createDetailObjects(data) as StarshipsObjects)
    : {};

  const starshipsEntries = pageStarshipsObjects
    ? Object.entries(pageStarshipsObjects)
    : [];

  const isDisplay = starshipsEntries.length > 0 && !isFetching;

  const totalCount = data?.count;

  return {
    isDisplay,
    starshipsEntries,
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

export default useStarshipsList;
