import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import * as Styles from '../styles/UserSearchBarStyle';

type SearchProps = {
    name: string,
    //callBack: function? to implement search term later.
}
const UserSearchBar = ({ name }: SearchProps) =>
    <Styles.SearchWrapper component="form" >
        <Styles.InputWrapper />
        <Styles.Search />
    </Styles.SearchWrapper >
    ;

export default UserSearchBar;