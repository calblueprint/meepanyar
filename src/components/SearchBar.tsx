import { TextField } from '@material-ui/core';
import React from 'react';

interface SearchProps {
  onSearchChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  placeholder?: string;
}

function SearchBar(props: SearchProps) {;
  return (
    <TextField
      name="search"
      onChange={props.onSearchChange}
      variant="standard"
      type="search"
      fullWidth
      placeholder={props.placeholder}
    />
  );
}

export default SearchBar;
