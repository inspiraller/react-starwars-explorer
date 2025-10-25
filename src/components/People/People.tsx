import useGetAllPeople from '@/context/Tanstack/usePeople/useGetAll';
import { usePeopleStore } from '@/store/zustand/people/people';
import { Autocomplete, Box, TextField } from '@mui/material';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

export const People = () => {
  // State to hold the selected name
  const [value, setValue] = React.useState<string | null>(null);
  // State to hold the input text while the user is typing
  const [inputValue, setInputValue] = React.useState('');

  useGetAllPeople();

  const { people: names } = usePeopleStore();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: '2rem' }, // Responsive padding-top
        width: '100%',
      }}
    >
      <Autocomplete
        sx={{ width: '100%' }}
        // Data source
        options={names}
        // Controlled value of the selected item
        value={value}
        onChange={(_event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        // Controlled value of the text in the input
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        // Custom filter function to limit the visible suggestions
        filterOptions={(options, state) => {
          if (!state.inputValue) return [];
          const lowerCaseInput = state.inputValue.toLowerCase();
          return options
            .filter((option) => option.toLowerCase().includes(lowerCaseInput))
            .slice(0, 10); // Limit to 10 for clean UI
        }}
        // Render the text input field
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search for a Person'
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
        // Settings for better user experience
        autoHighlight
        blurOnSelect
        noOptionsText={`No results found for "${inputValue}"`}
      />
    </Box>
  );
};
