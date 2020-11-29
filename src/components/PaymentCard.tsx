import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid',
      borderColor: '#F7F9FC',
      borderRadius: '6px',
      backgroundColor: '#F7F9FC',
    },
    content: {
      color: theme.palette.text.primary,
      padding: '15px 20px',
    },
    itemWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    break: {
      height: '20px',
    },
    button: {
      borderRadius: '12px',
      width: '120px',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    paymentText: {
      color: theme.palette.primary.main,
    },
    unbolded: {
      fontWeight: 500,
    }
  }),
);

interface CardProps {
  payment: number;
  paid: number;
}

export default function FilledCard(props: CardProps) {
  const classes = useStyles();
  const getPaymentButtons = () => {
    return (
      <Button className={classes.button} color="primary" disableElevation={true}>Add Payment</Button>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.itemWrapper}>
          <div>
            <Typography variant="h2">Payment to</Typography>
            <Typography variant="h2">Mee Panyar</Typography>
            <Typography variant="h3" className={classes.paymentText}>{props.payment} Ks</Typography>
          </div>
          {getPaymentButtons()}
        </div>
        <div className={classes.break}></div>
        <div className={classes.itemWrapper}>
          <div>
            <Typography variant="h4">Paid to Mee Panyar</Typography>
          </div>
          <div>
            <Typography variant="h4">{props.paid} Ks</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
