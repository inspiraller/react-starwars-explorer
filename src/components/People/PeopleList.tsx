import React, { useState, Activity } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CardHeader, // Import CardHeader
} from '@mui/material';
import type { PeopleObjects } from '@/types/Person';

interface PeopleListProps {
  people: PeopleObjects | null;
}

const PeopleList = ({ people }: PeopleListProps) => {
  const peopleEntries = people ? Object.entries(people) : [];
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const totalPages = Math.ceil(peopleEntries.length / perPage);
  const startIdx = (page - 1) * perPage;
  const currentEntries = peopleEntries.slice(startIdx, startIdx + perPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePerPageChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setPerPage(event.target.value as number);
    setPage(1); // reset to first page when changing count
  };

  return (
    <Box pt={'2rem'}>
      <Activity mode={people ? 'visible' : 'hidden'}>
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
          {currentEntries.map(([key, person]) => (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <Card sx={{ height: '100%' }}>
                {/* Replaced Typography inside CardContent with CardHeader */}
                <CardHeader
                  title={key}
                  titleTypographyProps={{
                    variant: 'h6',
                    // Apply color directly to the Typography component rendering the title
                    sx: {
                      px: '2rem',
                      color: 'var(--text-default-color)',
                      background: 'var(--bg-names)',
                    },
                  }}
                  sx={{
                    p: 0, // This styling still works for the CardHeader container padding
                  }}
                />

                <CardContent>
                  <Grid container spacing={1}>
                    {Object.entries(person).map(([k, v]) => {
                      if (k === 'name') return null;
                      const displayValue = Array.isArray(v) ? v.join(', ') : v;
                      return (
                        <React.Fragment key={k}>
                          <Grid item xs={4}>
                            <Typography
                              variant='body2'
                              color='text.secondary'
                              sx={{ fontWeight: 500 }}
                            >
                              {k}:
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant='body2'>
                              {displayValue}
                            </Typography>
                          </Grid>
                        </React.Fragment>
                      );
                    })}
                  </Grid>
                </CardContent>
              </Card>
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
