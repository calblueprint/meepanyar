import React from 'react';
import useStyles from '../styles/UserSearchBarStyle';
import { Button, TextField, Typography, Link, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
interface SearchProps {
  searchFun: any;
}

// const UserSearchBar = ({ searchFun }: SearchProps) => (
//   <Paper component="form" onChange={searchFun}>
//     <InputBase className = {classes.inputWrapper}/>
//     <SearchIcon className={classes.orange} />
//   </Paper>
// );

export default function UserSearchBar(props: SearchProps) {
  const classes = useStyles();
  return (
    <Paper component="form" onChange={props.searchFun}>
      <InputBase className={classes.inputWrapper} />
      <SearchIcon className={classes.search} />
    </Paper>
  );
}
