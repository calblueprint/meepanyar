import styled from 'styled-components';
import { Button, TextField, Typography, Link, Container, Card, CardContent } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// export const SingleCard = styled(Card)`
//   width: 310.71px;
//   height: 93.26px;
//   background: #ffffff;
//   border: 1px solid #e5e5e5;
//   box-sizing: border-box;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.14);
//   border-radius: 10px;
//   text-align: left;
//   display: flex;
//   flex-direction: row;
//   margin-bottom: 10px;
// `;

// export const InsideText = styled(Typography)`
//   font-family: Helvetica Neue;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 12px;
//   line-height: 98.1%;
//   color: #828282;
// `;

// export const TitleText = styled(Typography)`
//   font-family: Helvetica Neue;
//   font-style: normal;
//   font-weight: bold;
//   font-size: 12px;
//   line-height: 98.1%;
//   color: #828282;
// `;

// export const Arrow = styled(ArrowForwardIosIcon)`
//   color: #ff922e;
// `;

// export const CardCon = styled(CardContent)`
//   flex-grow: 1;
// `;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    arrow: {
      color: '#ff922e',
    },
    cardCon: {
      flexGrow: 1,
    },
    titleText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '12px',
      lineHeight: '98.1%',
      color: '#828282',
    },
    insideText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '98.1%',
      color: '#828282',
    },
    singleCard: {
      width: '310.71px',
      height: '93.26px',
      background: '#ffffff',
      border: '1px solid #e5e5e5',
      boxSizing: 'border-box',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.14)',
      borderRadius: '10px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '10px',
    },
  }),
);

export default useStyles;
