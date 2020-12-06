import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from './TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
    },
    content: {
      marginTop: '10px',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '6px',
      padding: '20px',
    },
    itemWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    right: {
      textAlign: 'right',
    },
    bolded: {
      fontWeight: 700,
    },
    divider: {
      margin: '10px 0px',
    },
    balanceText: {
      fontWeight: 700,
      color: theme.palette.primary.main,
    },
    fieldContainer: {
      marginTop: '10px',
    },
  }),
);

interface CardProps {
  bankName: string;
  accountNumber: number;
  accountName: string;
  balance: number;
}

export default function FilledCard(props: CardProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" color="textSecondary">
        Financial Info
      </Typography>
      <div className={classes.content}>
        <div className={classes.itemWrapper}>
          <div>
            <Typography className={classes.bolded} variant="body1">
              Bank
            </Typography>
            <Typography className={classes.bolded} variant="body1">
              Account Number
            </Typography>
            <Typography className={classes.bolded} variant="body1">
              Account Name
            </Typography>
          </div>
          <div className={classes.right}>
            <Typography variant="body1">{props.bankName}</Typography>
            <Typography variant="body1">**** **** {props.accountNumber}</Typography>
            <Typography variant="body1">{props.accountName}</Typography>
          </div>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.itemWrapper}>
          <Typography className={classes.bolded} variant="body1">
            Remaining Balance
          </Typography>
          <Typography variant="body1" className={classes.balanceText}>
            {props.balance} Ks
          </Typography>
        </div>
      </div>
      <div className={classes.fieldContainer}>
        <TextField label="Payment Amount" bold={true} />
      </div>
    </div>
  );
}
