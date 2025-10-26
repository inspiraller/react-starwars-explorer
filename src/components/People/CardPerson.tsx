import React from 'react';
import { Card, CardContent, Typography, CardHeader, Box } from '@mui/material';
import { Person } from '@/types/Person';

interface Props {
  person: Omit<Person, 'name'>;
  name: string | null;
}

const CardPersonComponent = ({ person, name }: Props) => {
  if (!person) return null;

  return (
    <Card sx={{ height: '100%' }} component={'article'}>
      <CardHeader
        component={'header'}
        title={name}
        titleTypographyProps={{
          variant: 'h6',
          component: 'h3',
          sx: {
            px: '2rem',
            color: 'var(--text-default-color)',
            background: 'var(--bg-names)',
          },
        }}
        sx={{ p: 0 }}
      />

      <CardContent>
        {Object.entries(person).map(([k, v]) => {
          if (k === 'name') return null;
          const displayValue = Array.isArray(v) ? v.join(', ') : v;
          return (
            <Box component={'dl'} key={k} display={'flex'} gap={'1rem'}>
              <Typography
                variant='body2'
                component={'dt'}
                sx={{
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  color: 'var(--text-color-th)',
                }}
              >
                {k}:
              </Typography>

              <Typography component={'dd'} variant='body2'>
                {displayValue}
              </Typography>
            </Box>
          );
        })}
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
