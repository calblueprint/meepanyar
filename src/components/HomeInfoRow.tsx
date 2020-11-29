import React from 'react';
import {
  ButtonBase,
  IconButton,
  StylesProvider,
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core';
import useStyles from '../styles/HomeInfoStyles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

type HomeInfoProps = {
  amount: string;
  name: string;
  classes: {
    cardRow: string, cardCon: string, rowTitle: string, rowTitleNum: string, rowTitleGrayed: string,
    rowTitleGrayedNum: string, arrow: string, check: string, error: string
  };
};

const styles = (theme: Theme) =>
  createStyles({
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
  });

function HomeInfoRow(props: HomeInfoProps) {
  const { amount, name, classes } = props;

  return (
    <div className={classes.cardRow}>
      {amount === '0' ? (
        <ButtonBase>
          <CardContent className={classes.cardCon}>
            <ErrorOutlineIcon className={classes.error} />
            <Typography className={classes.rowTitleGrayedNum}>{amount}</Typography>
            <Typography className={classes.rowTitleGrayed}>{name}</Typography>
            <ArrowForwardIosIcon className={classes.arrow} />
          </CardContent>
        </ButtonBase>
      ) : (
          <ButtonBase>
            <CardContent className={classes.cardCon}>
              <CheckCircleIcon className={classes.check} />
              <Typography className={classes.rowTitleNum}>{amount}</Typography>
              <Typography className={classes.rowTitle}>{name}</Typography>
              <ArrowForwardIosIcon className={classes.arrow} />
            </CardContent>
          </ButtonBase>
        )}
    </div>

  );
}

export default withStyles(styles)(HomeInfoRow);

