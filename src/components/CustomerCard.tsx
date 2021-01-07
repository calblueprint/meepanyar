import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, IconButton, StylesProvider } from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const styles = (theme: Theme) =>
  createStyles({
    arrow: {
      color: '#ff922e',
    },
    cardContent: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      margin: '0px',
      paddingTop: '16px',
      paddingLeft: '16px',
    },
    titleText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '98.1%',
      color: '#828282',
      paddingTop: '14px'
    },
    updatedText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      color: '#BDBDBD',
    },
    totalText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      color: '#6A6A6A',
      paddingTop: '14px'
    },
    numberText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#FF866F',
    },
    divSpacing: {
      paddingLeft: '15px',
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
    active: {
      height: '7px',
      width: '7px',
      borderRadius: '50%',
      backgroundColor: '#64B676',
      marginTop: '26px',
      marginRight: '5px',
    },
    notActive: {
      height: '7px',
      width: '7px',
      borderRadius: '50%',
      backgroundColor: '#E0E0E0',
      marginTop: '26px',
      marginRight: '5px',
    }
  });
interface CardProps {
  name: string;
  amount: string;
  date: string;
  active: boolean;
  classes: {
    arrow: string; cardContent: string; updatedText: string;
    singleCard: string; titleText: string; totalText: string;
    numberText: string; divSpacing: string; active: string; notActive: string;
  };
}

function CustomerCard(props: CardProps) {
  const { classes } = props;
  return (
    <Card className={classes.singleCard}>
      <div className={classes.cardContent}>
        {props.active ? <div className={classes.active} /> : <div className={classes.notActive} />}
        <div>
          <Typography className={classes.titleText}>{props.name}</Typography>
          <Typography className={classes.updatedText}>Last Updated: {props.date}</Typography>
        </div>
        <div className={classes.divSpacing}>
          <Typography className={classes.totalText}>Total owed: </Typography>
          <Typography className={classes.numberText}>{props.amount} Ks</Typography>
        </div>
      </div>
      <CardActions>
        <IconButton>
          <ArrowForwardIosIcon className={classes.arrow} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
export default withStyles(styles)(CustomerCard);
