import {
  Autocomplete as MuiAutocomplete,
  Box,
  CircularProgress,
  TextField,
} from '@mui/material';
import React, { Activity } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FormError } from '../Error/FormError';
import { useTranslation } from 'react-i18next';
import { UseQueryResult } from '@tanstack/react-query';

interface Props {
  type: 'Person' | 'Starship';
  isFetching?: boolean;
  isSuccess?: boolean;
  error?: UseQueryResult<any, Error> | undefined;
  names: string[];
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  value: string | null;
}
export const Autocomplete = ({
  type,
  isFetching,
  error,
  isSuccess,
  names,
  value,
  setValue,
}: Props) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Box
      sx={{
        position: 'relative', // important: parent for absolute positioning
        width: '100%',
        height: '6rem',
      }}
    >
      {/* Overlayed autocomplete container */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 20, // ensure it overlays other content
        }}
      >
        {isFetching && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <FormError>{t('Error. Cannot load Search')}</FormError>}

        {isSuccess && (
          <MuiAutocomplete
            sx={{ width: '100%' }}
            options={names}
            value={value}
            onChange={(_event, newValue) => setValue(newValue)}
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
