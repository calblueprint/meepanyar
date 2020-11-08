import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import * as Styles from '../styles/UserSearchBarStyle';

type SearchProps = {
  searchFun: any;
};
const UserSearchBar = ({ searchFun }: SearchProps) => (
  <Styles.SearchWrapper component="form" onChange={searchFun}>
    <Styles.InputWrapper />
    <Styles.Search />
  </Styles.SearchWrapper>
);
export default UserSearchBar;
