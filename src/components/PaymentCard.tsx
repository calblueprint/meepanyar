import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '15px 0',
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: '6px',
    },
    content: {
      padding: '8px 12px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
    },
    itemWrapper: {
      display: 'flex',
    },
    items: {
      color: theme.palette.text.primary,
      margin: '5px',
    },
    divider: {
      margin: '0 0 5px 0',
    },
  }),
);

interface CardProps {
  balance: number;
  owed: number;
}

export default function PaymentCard(props: CardProps) {
  const classes = useStyles();

  //   getItem = (number: number, label: Label, buttonLabel: string, icon?: any)

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.itemWrapper}></div>
      </div>
    </div>
  );
}
