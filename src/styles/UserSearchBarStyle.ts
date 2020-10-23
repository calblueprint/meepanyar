import styled from 'styled-components';
import { Button, TextField, Typography, Link, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export const Search = styled(SearchIcon)`
color: #828282;
`;


export const SearchWrapper = styled(Paper)`
width: 134.45px;
height: 25px;
border: 1px solid #FF922D;
box-sizing: border-box;
border-radius: 10px;
text-align: right;`;

export const InputWrapper = styled(InputBase)`
width: 100.45px;
height: 25px;
`;