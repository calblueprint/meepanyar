import styled from "styled-components";
import { Button, Card, CardContent, Paper, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const MainCard = styled(Paper)`
width: 308.81px;
height: 253.81px;
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
flex-grow: 1;
text-align: left;
display: flex;
flex-direction: row;
`;

export const CardCon = styled.div`
flex-grow: 1;
`;

export const RowTitle = styled(Typography)`
font-family: Helvetica Neue;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 22px;
color: #828282;
`;

export const Arrow = styled(ArrowForwardIosIcon)`
color: #FF922E;
`;



