import { Activity } from 'react';
import {
  Grid,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FormError } from '@/components/Error/FormError';

import CardDetails from '@/components/CardDetails/CardDetails';
import useSpeciesList from './useSpeciesList';
import { Specie } from '@/types/Specie';

const SpeciesList = () => {
  const { t } = useTranslation();
  const {
    isFetching,
    error,
    isDisplay,
    perPage,
    speciesEntries,
    handlePageChange,
    handlePerPageChange,
    totalPages,
    page,
    isMobile,
    totalCount,
  } = useSpeciesList();

  return (
    <Box pt={'2rem'} component={'section'}>
      {isFetching ? <CircularProgress /> : null}
      {error ? (
        <FormError>{t(`Error displaying this page ${1}`)}</FormError>
      ) : null}
      <Activity mode={isDisplay ? 'visible' : 'hidden'}>
        <Typography component={'h2'} fontSize={'2rem'} mb={'2rem'}>
          {t('Results')} ({totalCount})
        </Typography>
        {/* Controls */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'start' : 'space-between',
            alignItems: 'center',
            mb: 2,
            width: isMobile ? '100%' : 'auto',
            gap: '1rem',
          }}
        >
          <FormControl size='small' sx={{ width: isMobile ? '100%' : '12rem' }}>
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
            siblingCount={isMobile ? 0 : 1}
            boundaryCount={isMobile ? 1 : 2}
          />
        </Box>

        {/* Cards */}
        <Grid container spacing={2}>
          {speciesEntries.map(([key, specie]) => (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <CardDetails<Specie> details={specie} name={key} />
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

export default SpeciesList;
