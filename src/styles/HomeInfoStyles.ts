import styled from "styled-components";
import { Button, Card, CardContent, Paper, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
`;

export const CardCon = styled(CardContent)`
flex-grow: 1;
flex-direction: row;
display: flex;
`;

// export const CardCon = styled.div`
// flex-grow: 1;
// flex-direction: row;
// display:flex;
// `;

export const RowTitle = styled(Typography)`
font-family: Helvetica Neue;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 22px;
color: #828282;
`;

//just making another component rn so save cause idk how to use type script
export const RowTitleGrayed = styled(RowTitle)`
color: #BDBDBD;
`;

export const Arrow = styled(ArrowForwardIosIcon)`
color: #FF922E;
`;

export const Check = styled(CheckCircleIcon)`
color: #FF922D;
`;

export const Error = styled(ErrorOutlineIcon)`
color: #FFCFA2;
`;


