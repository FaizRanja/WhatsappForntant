import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search({onSearch}) {

  const [keyword, setKeyword] = useState('');


  // Function to handle search and filter
  const handleSearch = () => {
    // Construct the query parameters
    const params = {
      keyword: keyword.trim(),
    };

    // Trigger the onSearch callback with the new search parameters
    console.log('Triggering search with params:', params); // Debug: log search params
    onSearch(params);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end form-control-small">
        <div style={{ display: 'flex', alignItems: 'center' }}>
        
          <TextField
            placeholder="Enter Keyword Here ..."
            variant="outlined"
            size="small"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ width: '250px', marginRight: '0.5rem' }} // Adjust the width and margin as needed
          />
             <IconButton color="primary" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}


export default Search

