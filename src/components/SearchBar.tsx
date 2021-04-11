import { TextField as MaterialTextField, makeStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

interface SearchProps {
  onSearchChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onSearchExit?: any;
  placeholder?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      width: '100%',
    },
  }));

function SearchBar(props: SearchProps) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <MaterialTextField
        name="search"
        onChange={props.onSearchChange}
        variant="standard"
        fullWidth
        placeholder={props.placeholder}
        inputRef={input => input && input.focus()}
      />
      <CloseIcon onClick={props.onSearchExit} />
    </div>
  );
}

export default SearchBar;
