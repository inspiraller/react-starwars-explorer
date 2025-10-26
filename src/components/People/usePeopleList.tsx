import React, { useState } from 'react';
import {
  useTheme,
  useMediaQuery, // Import CardHeader
} from '@mui/material';
import type { PeopleObjects, ResponsePeople } from '@/types/Person';

import useGetPage from '@/context/Tanstack/dynamic/useGetPage';
import {
  DISPLAY_ITEMS_PER_PAGE,
  URL_API_PATH,
} from '@/context/Tanstack/usePeople/const';
import { getTotalPages } from '@/context/Tanstack/dynamic/getTotalPages';

import { useUpdatePeopleStore } from '@/context/Tanstack/usePeople/useUpdatePeopleStore';
import createPeopleObjects from '@/context/Tanstack/usePeople/util/createPeopleObjects';

const usePeopleList = () => {
  const { callback } = useUpdatePeopleStore();

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
  const { isFetching, error, data } = useGetPage<ResponsePeople>({
    url: URL_API_PATH,
    page,
    callback,
  });

  const totalPages = data
    ? getTotalPages(data?.count, DISPLAY_ITEMS_PER_PAGE)
    : 0;

  const pagePeopleObjects = data
    ? (createPeopleObjects(data) as PeopleObjects)
    : {};

  const peopleEntries = pagePeopleObjects
    ? Object.entries(pagePeopleObjects)
    : [];

  const isDisplay = peopleEntries.length > 0 && !isFetching;


  const totalCount = data?.count;

  return {
    isDisplay,
    peopleEntries,
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

export default usePeopleList;
