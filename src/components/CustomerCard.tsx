import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, IconButton, StylesProvider } from '@material-ui/core';
import useStyles from '../styles/CustomerCardStyles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface CardProps {
  name: string;
  amount: string;
  date: string;
}
export default function CustomerCard(props: CardProps) {
  const classes = useStyles();
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
