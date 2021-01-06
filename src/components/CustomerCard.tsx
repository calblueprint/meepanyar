import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, IconButton, StylesProvider } from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const styles = (theme: Theme) =>
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
      paddingBottom: '5.5px',
    },
    insideText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '98.1%',
      color: '#828282',
      paddingBottom: '5.5px',
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
  });
interface CardProps {
  name: string;
  amount: string;
  date: string;
  classes: { arrow: string; cardCon: string; insideText: string; singleCard: string; titleText: string };
}

function CustomerCard(props: CardProps) {
  const { classes } = props;
  return (
    <StylesProvider injectFirst>
      <Card className={classes.singleCard}>
        <CardContent className={classes.cardCon}>
          <Typography className={classes.titleText}>{props.name}</Typography>
          <Typography className={classes.insideText}>Total owed: {props.amount}</Typography>
          <Typography className={classes.insideText}>Last Updated: {props.date}</Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <ArrowForwardIosIcon className={classes.arrow} />
          </IconButton>
        </CardActions>
      </Card>
    </StylesProvider>
  );
}
export default withStyles(styles)(CustomerCard);
