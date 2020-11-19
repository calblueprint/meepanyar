import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: '7px',
      marginBottom: '15px',
      borderBottom: `1px solid ${theme.palette.text.secondary}`,
    },
    unbolded: {
      fontWeight: 500,
    }
  }),
);

interface RecordProps {
  date: string;
  used?: number | null;
  amount: number;
}

export default function Record(props: RecordProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.unbolded}>{props.date}</Typography>
      <Typography variant="h1">
        {props.used ? props.used + ' kWh |' : null} {props.amount} Ks
      </Typography>
    </div>
  );
};
