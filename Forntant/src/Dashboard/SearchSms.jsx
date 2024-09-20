import Search from '@mui/icons-material/Search';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

const SearchSms = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');

  // Function to handle search and filter
  const handleSearch = () => {
    // Construct the query parameters
    const params = {
      keyword: keyword.trim(),
      date: date || undefined, // Ensure date is not an empty string
    };

    // Trigger the onSearch callback with the new search parameters
    console.log('Triggering search with params:', params); // Debug: log search params
    onSearch(params);
  };

  // Optional: Handle Enter key press for search
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end form-control-small">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Enter Keyword Here ..."
            variant="outlined"
            size="small"
            sx={{ width: '250px', marginRight: '0.5rem' }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress} // Trigger search on Enter key
          />
          <TextField
            type="date"
            variant="outlined"
            size="small"
            sx={{ width: '250px', marginRight: '0.5rem' }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onKeyPress={handleKeyPress} // Trigger search on Enter key
          />
          <IconButton color="primary" onClick={handleSearch}>
            <Search />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SearchSms;
