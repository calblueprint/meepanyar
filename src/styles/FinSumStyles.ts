import styled from "styled-components";
import { Button, TextField, Typography, Link, Container, Card, CardContent } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const SingleCard = styled(Card)`
width: 308.81px;
height: 57.04px;
background: #FFE3CA;
text-align: left;
display: flex;
flex-direction: row;
`;

export const InsideText = styled(Typography)`
font-family: Helvetica Neue;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 22px;
color: #FF7A00;
`;

export const Arrow = styled(ArrowForwardIosIcon)`
color: #FF922E;
`;

export const CardCon = styled(CardContent)`
flex-grow: 1;
`;
