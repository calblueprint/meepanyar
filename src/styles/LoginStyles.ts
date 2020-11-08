import styled from 'styled-components';
import { Button, TextField, Typography, Link, Container } from '@material-ui/core';

<<<<<<< HEAD
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
=======
export const MainDiv = styled('div')`
  margin-top: 80px;
`;

export const FieldDiv = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 95%;
  margin: auto;
`;

export const Label = styled(Typography)`
  color: #828282;
  font-size: 12px;
  font-weight: bold;
`;

export const Field = styled(TextField)`
  background-color: #f8f8f8;
  outlined: false;
  border-radius: 15px;
  width: 100%;
  height: 69px;
  margin-bottom: 25px;
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
  text-transform: none;
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export const SignUpLink = styled(Link)`
  color: #828282;
  font-size: 12px;
  font-weight: bold;
`;
>>>>>>> main
