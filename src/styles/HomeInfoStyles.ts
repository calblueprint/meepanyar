import styled from "styled-components";
import { Button, Card, CardContent, Paper, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export const MainCard = styled(Paper)`
width: 308.81px;
height: 257.81px;
background: #FFFFFF;
border: 1px solid #E5E5E5;
box-sizing: border-box;
border-radius: 6px;
flex-direction: column;
`;

export const CardRow = styled.div`
flex-direction: row;
height: 63.4525px;
width: 308.81px;
display: flex;
`;

export const CardCon = styled(CardContent)`
flex-direction: row;
display: flex;
margin-top: 13.25px;
width: 308.81px;
text-align: left;
`;

export const RowTitle = styled(Typography)`
font-family: Helvetica Neue;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 22px;
color: #828282;
text-align: left;
flex-grow: 2;
`;

export const RowTitleNum = styled(RowTitle)`
flex-grow: 0;
margin-right: 16.61px;
`;

//just making another component rn so save cause idk how to use type script
export const RowTitleGrayed = styled(RowTitle)`
color: #BDBDBD;
`;

export const RowTitleGrayedNum = styled(RowTitleNum)`
color: #BDBDBD;
`;

export const Arrow = styled(ArrowForwardIosIcon)`
color: #FF922E;
font-size: 18px;
`;

export const Check = styled(CheckCircleIcon)`
color: #FF922D;
margin-right: 16.61px;
`;

export const Error = styled(ErrorOutlineIcon)`
color: #FFCFA2;
margin-right: 16.61px;
`;
// margin-right: 16px;
// margin-left: 20px;


