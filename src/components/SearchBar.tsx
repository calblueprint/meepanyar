import { TextField as MaterialTextField, withStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

interface SearchProps {
  classes: { root: string; };
  onSearchChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onSearchExit?: any;
  placeholder?: string;
  autoFocus?: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      width: '100%',
    },
  });

function SearchBar(props: SearchProps) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <MaterialTextField
        name="search"
        onChange={props.onSearchChange}
        variant="standard"
        fullWidth
        placeholder={props.placeholder}
        inputRef={props.autoFocus ? input => input && input.focus() : undefined}
      />
      <CloseIcon onClick={props.onSearchExit} />
    </div>
  );
}

export default withStyles(styles)(SearchBar);;
