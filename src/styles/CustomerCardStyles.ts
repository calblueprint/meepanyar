import styled from "styled-components";
import { Button, TextField, Typography, Link, Container, Card, CardContent } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const SingleCard = styled(Card)`
width: 310.71px;
height: 93.26px;
background: #FFFFFF;
border: 1px solid #E5E5E5;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.14);
border-radius: 10px;
text-align: left;
display: flex;
flex-direction: row;
`;

export const InsideText = styled(Typography)`
font-family: Helvetica Neue;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 98.1%;
color: #828282;
`;

export const TitleText = styled(Typography)`
font-family: Helvetica Neue;
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 98.1%;
color: #828282;
`;

export const Arrow = styled(ArrowForwardIosIcon)`
color: #FF922E;
`;

export const CardCon = styled(CardContent)`
flex-grow: 1;
`;
