import React from 'react';
import { Card, CardContent, Typography, Grid, CardHeader } from '@mui/material';
import { Person } from '@/types/Person';

interface Props {
  person: Omit<Person, 'name'>;
  name: string | null;
}

const CardPersonComponent = ({ person, name }: Props) => {
  if (!person) return null;

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={name}
        titleTypographyProps={{
          variant: 'h6',
          sx: {
            px: '2rem',
            color: 'var(--text-default-color)',
            background: 'var(--bg-names)',
          },
        }}
        sx={{ p: 0 }}
      />

      <CardContent>
        <Grid container spacing={1}>
          {Object.entries(person).map(([k, v]) => {
            if (k === 'name') return null;
            const displayValue = Array.isArray(v) ? v.join(', ') : v;
            return (
              <React.Fragment key={k}>
                <Grid
                  item
                  xs={4}
                  sx={{
                    borderBottom: '1px solid black',
                    textAlign: 'right',
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      color: 'var(--text-color-th)',
                    }}
                  >
                    {k}:
                  </Typography>
                </Grid>
                <Grid item xs={8} sx={{ borderBottom: '1px solid black' }}>
                  <Typography variant='body2'>{displayValue}</Typography>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

// Memoize with shallow comparison
const CardPerson = React.memo(CardPersonComponent, (prev, next) => {
  // Basic shallow comparison: if person and name are unchanged by reference/value, skip re-render
  return prev.name === next.name && prev.person === next.person;
});

export default CardPerson;
