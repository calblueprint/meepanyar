import styled from 'styled-components';
import { Button, TextField, Typography, Link, Container, Card, CardContent } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// export const SingleCard = styled(Card)`
//   width: 308.81px;
//   height: 57.04px;
//   background: #ffe3ca;
//   display: flex;
//   flex-direction: row;
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 31.97px;
// `;

// export const InsideText = styled(Typography)`
//   font-family: Helvetica Neue;
//   font-style: normal;
//   font-weight: bold;
//   font-size: 18px;
//   line-height: 22px;
//   color: #ff7a00;
//   flex-grow: 1;
// `;

// export const Arrow = styled(ArrowForwardIosIcon)`
//   color: #ff922e;
//   font-size: 18px;
// `;

// export const CardCon = styled(CardContent)`
//   flex-direction: row;
//   display: flex;
//   width: 308.81px;
//   text-align: left;
// `;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardCon: {
      flexDirection: 'row',
      display: 'flex',
      width: '308.81px',
      textAlign: 'left',
    },
    arrow: {
      color: '#ff922e',
      fontSize: '18px'
    },
    insideText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '22px',
      color: '#ff7a00',
      flexGrow: 1,
    },
    singleCard: {
      width: '308.81px',
      height: '57.04px',
      background: '#ffe3ca',
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '31.97px',
    }
  }),
);

export default useStyles;