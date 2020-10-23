import styled from 'styled-components';
import { Button, TextField, Typography, Link, Container } from '@material-ui/core';

export const MainDiv = styled('div')`
    margin-top: 80px;
`;

export const FieldDiv = styled('div')`

`;

export const Label = styled(Typography)`
    color: #828282;
    font-size: 12px;
    font-weight: bold;
    margin-top: -20px;
    margin-left: -83%;
`;

export const Field = styled(TextField)`
    background-color: #F8F8F8;
    outlined: false;
    border-radius: 15px;
    width: 95%;
    height: 69px;
    margin-bottom: 25px;
`;

export const LoginButton = styled(Button)`
    color: #828282;
    font-size: 12px;
    font-weight: bold;
    border-radius: 15px;
    box-shadow: none;
    width: 187px;
    height: 48px;
    text-transform: none;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 20px;
`;

export const SignUpLink = styled(Link)`
    color: #828282;
    font-size: 12px;
    font-weight: bold;
`;
