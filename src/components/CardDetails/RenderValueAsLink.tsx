import { env } from '@/const/env';
import { Link } from '@mui/material';
import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

const { VITE_API_BASE_URL } = env;
interface Props {
  displayValue?: string;
}
const RenderValuesAsLinks = ({ displayValue }: Props) => {
  const isLink = displayValue?.indexOf(VITE_API_BASE_URL) !== -1;

  if (isLink) {
    const multiple = displayValue?.split(',');
    return multiple?.map((eachValue) => {
      const to = eachValue.split(VITE_API_BASE_URL)[1];
      const sanitizedTo = to?.replace(/[<>]|\/$/g, ''); // remove last /. remove any nefarious scripts
      return sanitizedTo ? (
        <Link
          key={`display-values-${eachValue}`}
          component={RouterLink}
          to={sanitizedTo}
          underline='hover'
          variant='h6'
          minWidth='14rem'
          color={'var(--link-default)'}
          fontSize={'1.6rem'}
          mr={'0.7rem'}
          display={'block'}
        >
          {sanitizedTo}
        </Link>
      ) : null;
    });
  }
  return displayValue;
};

// Memoize with shallow comparison
const MemoRenderValuesAsLinks = React.memo(
  RenderValuesAsLinks,
  (prev, next) => {
    // Basic shallow comparison: if details and name are unchanged by reference/value, skip re-render
    return prev.displayValue === next.displayValue;
  },
);

export default MemoRenderValuesAsLinks;
