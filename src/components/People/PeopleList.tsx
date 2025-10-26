import React, { useState, Activity } from 'react';
import {
  Grid,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress, // Import CardHeader
} from '@mui/material';
import type { ResponsePeople } from '@/types/Person';

import { FormError } from '../Error/FormError';
import { useTranslation } from 'react-i18next';
import useGetPage from '@/context/Tanstack/dynamic/useGetPage';
import {
  DISPLAY_ITEMS_PER_PAGE,
  URL_API_PATH,
} from '@/context/Tanstack/usePeople/const';
import { getTotalPages } from '@/context/Tanstack/dynamic/getTotalPages';

import CardPerson from './CardPerson';
import { useUpdatePeopleStore } from '@/context/Tanstack/usePeople/useUpdatePeopleStore';
import { usePeopleStore } from '@/store/zustand/people/people';

const PeopleList = () => {
  const { t } = useTranslation();
  const { callback } = useUpdatePeopleStore();

  // local states
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DISPLAY_ITEMS_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePerPageChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
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

  const { peopleObjects } = usePeopleStore();

  const peopleEntries = peopleObjects ? Object.entries(peopleObjects) : [];

  const isDisplay = peopleEntries.length > 0 && !isFetching;

  console.log('PeopleList', {
    isDisplay,
    peopleEntries,
    peopleObjects,
    totalPages,
  });

  return (
    <Box pt={'2rem'}>
      {isFetching ? <CircularProgress /> : null}
      {error ? (
        <FormError>{t(`Error displaying this page ${1}`)}</FormError>
      ) : null}
      <Activity mode={isDisplay ? 'visible' : 'hidden'}>
        {/* Controls */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <FormControl size='small' sx={{ minWidth: 120 }}>
            <InputLabel id='per-page-label'>Per page</InputLabel>
            <Select
              labelId='per-page-label'
              value={perPage}
              label='Per page'
              onChange={handlePerPageChange}
            >
              {[5, 10, 20, 40].map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color='primary'
          />
        </Box>

        {/* Cards */}
        <Grid container spacing={2}>
          {peopleEntries.map(([key, person]) => (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <CardPerson person={person} name={key} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination below */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color='primary'
            />
          </Box>
        )}
      </Activity>
    </Box>
  );
};

export default PeopleList;
