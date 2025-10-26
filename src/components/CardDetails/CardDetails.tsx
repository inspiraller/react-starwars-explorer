import { Card, CardContent, Typography, CardHeader, Box } from '@mui/material';
import React from 'react';
import RenderValuesAsLinks from './RenderValueAsLink';

interface Props<Details> {
  details: Omit<Details, 'name' | 'title'>;
  name: string | null;
}

const CardComponent = <Details,>({ details, name }: Props<Details>) => {
  if (!details) return null;

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
        {Object.entries(details).map(([k, v]) => {
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
                <RenderValuesAsLinks displayValue={String(displayValue)} />
              </Typography>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

// Memoize with shallow comparison
const MemoCardComponent = React.memo(CardComponent, (prev, next) => {
  // Basic shallow comparison: if details and name are unchanged by reference/value, skip re-render
  return prev.name === next.name && prev.details === next.details;
});

const CardDetails = MemoCardComponent as <T>(
  props: Props<T>,
) => React.ReactElement | null;

export default CardDetails;
