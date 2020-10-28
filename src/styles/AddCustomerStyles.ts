import styled from 'styled-components';
import { Button, TextField, Typography, Link, Container, Checkbox } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export const Label = styled(Typography)`
    color: #828282;
    font-size: 12px;
    font-weight: bold;
    text-align: left;
    padding: 6px 0px;
    margin-left: 11%;
`;

export const BackButton = styled(Button)`
    border-radius: 60px;
    width: 60px;
    height: 60px;
`;

export const BackArrow = styled(ArrowBackIosIcon)`
    color: #FF922E;
    margin-left: 5px;
`;

export const HeaderText = styled(Typography)`
    font-size: 18px;
    align-self: center;
    margin-left: 8%;
    font-weight: bold;
    color: #828282;
`;

export const HeaderDiv = styled('div')`
    display: flex;
    margin-top: 15px;
    margin-left: 20px;
`;

export const MainDiv = styled('div')`
    margin-top: 20px;
`;

export const Field = styled(TextField)`
    background-color: white;
    border: 1px solid #FF922E;
    border-radius: 5px;
    width: 311.41px;
    height: 30px;
    padding: 1px 10px;
`;

export const AddButton = styled(Button)`
    color: white;
    background-color: #FF922E;
    font-size: 12px;
    font-weight: bold;
    border-radius: 20px;
    width: 187px;
    height: 48px;
    margin: 8px 0px;
    text-transform: none;
`;

export const Check = styled(Checkbox)`
    color: #FF922E;
    float: left;
    margin-left: 5%;
    size: small;
`;

export const CheckIcon = styled('div')`
    background-color: white;
    width: 20px;
    height: 20px;
    border: 1px solid #FF922E;
    border-radius: 3px;
`;

export const CheckDiv = styled('div')`
    display: flex;
    position: absolute;
    margin-top: 10px;
    margin-left: 33px;
`;

export const CheckedIcon = styled(CheckBoxIcon)`
    color: #FF922E;
    width: 25px;
    height: 25px;
    margin-left: -2px;
    margin-top: -3px;
`;

export const CheckLabel = styled(Typography)`
    color: #828282;
    position: absolute;
    font-size: 12px;
    font-weight: bold;
    text-align: left;
    padding: 6px 0px;
    width: 300px;
    margin-left: 45px;
    margin-top: 3px;
`;

export const CheckField = styled(TextField)`
    position: absolute;
    background-color: white;
    border: 1px solid #FF922E;
    border-radius: 5px;
    width: 76px;
    height: 30px;
    margin-left: 90px;
    margin-top: 5px;
    padding: 0px 10px;
`;
