import React from 'react';

import { Button, TextField, Typography, Link, InputBase, Paper, createStyles, Theme, withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
interface SearchProps {
  searchFun: any;
  classes: { search: string; searchWrapper: string; inputWrapper: string; };
}

const styles = (theme: Theme) =>
  createStyles({
    search: {
      color: '#828282',
    },
    searchWrapper: {
      width: '135.45px',
      height: '25px',
      border: '1px solid #ff922d',
      boxSizing: 'border-box',
      borderRadius: '10px',
      textAlign: 'right',
    },
    inputWrapper: {
      width: '100.45px',
      height: '25px',
    },
  });

function UserSearchBar(props: SearchProps) {
  const { classes } = props;
  return (
    <Paper component="form" onChange={props.searchFun} className={classes.searchWrapper} elevation={0}>
      <InputBase className={classes.inputWrapper} />
      <SearchIcon className={classes.search} />
    </Paper>
  );
}

export default withStyles(styles)(UserSearchBar);
