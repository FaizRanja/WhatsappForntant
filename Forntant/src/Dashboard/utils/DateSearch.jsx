import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
    
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
          />
        )}
      />
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
 

  { title: 'All', year: 2024 },
  { title: 'Today', year: 2024 },
  { title: 'Yesteday', year: 2024 },
  { title: 'Last 7 Days', year: 2024 },
  { title: 'This Month', year: 2024 },
  { title: 'Last Month', year: 2024 },
  { title: 'Custom Range', year: 2024 ,type:"date" },
];



