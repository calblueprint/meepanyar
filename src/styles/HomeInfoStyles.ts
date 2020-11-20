import styled from 'styled-components';
import { Button, Card, CardContent, Paper, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// export const MainCard = styled(Paper)`
//   width: 308.81px;
//   height: 257.81px;
//   background: #ffffff;
//   border: 1px solid #e5e5e5;
//   box-sizing: border-box;
//   border-radius: 6px;
//   flex-direction: column;
//   margin-left: auto;
//   margin-right: auto;
// `;

// export const CardRow = styled.div`
//   height: 63.4525px;
//   display: flex;
// `;

// export const CardCon = styled(CardContent)`
//   flex-direction: row;
//   display: flex;
//   margin-top: 13.25px;
//   width: 308.81px;
//   text-align: left;
// `;

// export const RowTitle = styled(Typography)`
// font-family: Helvetica Neue;
// font-style: normal;
// font-weight: bold;
// font-size: 18px;
// line-height: 22px;
// color: #828282;
// text-align: left;
// flex-grow: 2;
// `;

// export const RowTitleNum = styled(RowTitle)`
//   flex-grow: 0;
//   margin-right: 16.61px;
// `;

// //just making another component rn so save cause idk how to use type script
// export const RowTitleGrayed = styled(RowTitle)`
//   color: #bdbdbd;
// `;

// export const RowTitleGrayedNum = styled(RowTitleNum)`
//   color: #bdbdbd;
// `;

// export const Arrow = styled(ArrowForwardIosIcon)`
//   color: #ff922e;
//   font-size: 18px;
// `;

// export const Check = styled(CheckCircleIcon)`
//   color: #ff922d;
//   margin-right: 16.61px;
// `;

// export const Error = styled(ErrorOutlineIcon)`
//   color: #ffcfa2;
//   margin-right: 16.61px;
// `;

// export const Header = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-left: auto;
//   margin-right: auto;
//   top: 90.09px;
// `;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainCard: {
      width: '308.81px',
      height: '257.81px',
      background: '#ffffff',
      border: '1px solid #e5e5e5',
      boxSizing: 'border-box',
      borderRadius: '6px',
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    cardRow: {
      height: '63.4525px',
      display: 'flex',
    },
    cardCon: {
      flexDirection: 'row',
      display: 'flex',
      marginTop: '13.25px',
      width: '308.81px',
      textAlign: 'left',
    },
    rowTitle: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '22px',
      color: '#828282',
      textAlign: 'left',
      flexGrow: 2,
    },
    rowTitleNum: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '22px',
      color: '#828282',
      textAlign: 'left',
      flexGrow: 0,
      marginRight: '16.61px',
    },
    rowTitleGrayed: {
      color: '#bdbdbd',
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '22px',
      textAlign: 'left',
      flexGrow: 2,
    },
    rowTitleGrayedNum: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '22px',
      color: '#bdbdbd',
      textAlign: 'left',
      flexGrow: 0,
      marginRight: '16.61px',
    },
    arrow: {
      color: '#ff922e',
      fontSize: '18px',
    },
    check: {
      color: '#ff922d',
      fontSize: '16.61px',
    },
    error: {
      color: '#ffcfa2',
      fontSize: '16.61px',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 'auto',
      marginRight: 'auto',
      top: '90.09px',
    },
  }),
);

export default useStyles;
