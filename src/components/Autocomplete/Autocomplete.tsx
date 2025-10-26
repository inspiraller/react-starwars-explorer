import {
  Autocomplete as MuiAutocomplete,
  Box,
  CircularProgress,
  TextField,
  Popper, // Import Popper
  PopperProps, // Import PopperProps for typing
} from '@mui/material';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { FormError } from '../Error/FormError';
import { useTranslation } from 'react-i18next';
import { UseQueryResult } from '@tanstack/react-query';

export interface SetValues {
  setNameValue: (name: string | null) => void;
  nameValue: string | null;
}
interface Props extends SetValues {
  type: 'Person' | 'Starship';
  isFetching?: boolean;
  isSuccess?: boolean;
  error?: UseQueryResult<any, Error> | undefined;
  names: string[];
}

// ✅ Custom Popper: ensure it matches anchor width + full opacity
const CustomPopper = (props: PopperProps) => (
  <Popper
    {...props}
    style={{
      ...props.style,
      zIndex: 1500,
      background: 'var(--bg-default)',
      width: (props.anchorEl as HTMLElement)?.clientWidth ?? '100%', // match width of input
    }}
  />
);

const Autocomplete = ({
  type,
  isFetching,
  error,
  isSuccess,
  names,
  nameValue,
  setNameValue,
}: Props) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '6rem',
      }}
    >
      {/* This Box is necessary for your absolute positioning setup, but 
          it might be the cause of the clipping if its children are too tall. */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 20,
        }}
      >
        {isFetching && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <FormError>{t('Error. Cannot load Search')}</FormError>}

        {isSuccess && (
          <MuiAutocomplete<string, false, false, false>
            sx={{ width: '100%' }}
            options={names}
            value={nameValue}
            onChange={(_event, newValue) => setNameValue(newValue)}
            inputValue={inputValue}
            onInputChange={(_event, newInputValue) =>
              setInputValue(newInputValue)
            }
            filterOptions={(options, state) => {
              if (!state.inputValue) return [];
              const lowerCaseInput = state.inputValue.toLowerCase();
              return options
                .filter((option) =>
                  option.toLowerCase().includes(lowerCaseInput),
                )
                .slice(0, 10);
            }}
            PopperComponent={CustomPopper}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: (theme) => theme.palette.background.paper, // use theme background
                  opacity: 1,
                  boxShadow: 3,
                  backdropFilter: 'none', // disable any blur
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`${t('Search for')} ${type}`}
                placeholder='Start typing a name...'
                variant='outlined'
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  startAdornment: <FaSearch />,
                }}
              />
            )}
            autoHighlight
            blurOnSelect
            noOptionsText={`No results found for "${inputValue}"`}
          />
        )}
      </Box>
    </Box>
  );
};

export default Autocomplete;
