import styled from 'styled-components';
import { Button, TextField, Typography, Link, Container } from '@material-ui/core';

export const LoginContainer = styled(Container)`
    margin-top: 4%;
`;

export const Label = styled(Typography)`
    color: #828282;
    font-size: 12px;
    font-weight: bold;
    text-align: left;
    padding: 6px 0px;
    margin-left: 8%;
    display: block;
`;

export const Field = styled(TextField)`
    background-color: #F8F8F8;
    outlined: false;
    border-radius: 15px;
    width: 340px;
    height: 69px;
    padding: 18px 20px;
`;

export const LoginButton = styled(Button)`
    color: #828282;
    font-size: 12px;
    font-weight: bold;
    border-radius: 15px;
    box-shadow: none;
    width: 187px;
    height: 48px;
    margin: 8px 0px;
    text-transform: none;
`;

export const SignUpLink = styled(Link)`
    color: #828282;
    font-size: 12px;
    font-weight: bold;
`;