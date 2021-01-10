import React from 'react';

import { InputBase, Paper, createStyles, Theme, withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
interface SearchProps {
  onSearchChange: any;
  classes: { search: string; searchWrapper: string; inputWrapper: string; searchWrapperFocused: string };
}

const styles = () =>
  createStyles({
    search: {
      color: '#828282',
      height: '75%',
    },
    searchWrapper: {
      width: '100%',
      height: '25px',
      border: '1px solid #BDBDBD',
      boxSizing: 'border-box',
      borderRadius: '10px',
      textAlign: 'right',
      '&:hover': {
        border: '1px solid #ff922d',
      },
    },
    searchWrapperFocused: {
      width: '100%',
      height: '25px',
      border: '1px solid #ff922d',
      boxSizing: 'border-box',
      borderRadius: '10px',
      textAlign: 'right',
    },
    inputWrapper: {
      width: '75%',
      height: '25px',
    },
  });

function UserSearchBar(props: SearchProps) {
  const { classes } = props;
  return (
    <div onChange={props.onSearchChange} className={classes.searchWrapper} >
      <InputBase className={classes.inputWrapper} />
      <SearchIcon className={classes.search} />
    </div>
  );
}

export default withStyles(styles)(UserSearchBar);
