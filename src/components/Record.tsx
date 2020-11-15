import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'left',
      marginLeft: '-20px',
    },
    content: {
      marginTop: '25px',
    },
    item: {
      marginTop: '-20px',
      marginBottom: '20px',
      paddingBottom: '5px',
      borderBottom: `1px solid ${theme.palette.text.secondary}`,
    },
    unbolded: {
      fontWeight: 500,
    }
  }),
);

interface RecordProps {
  date: string;
  used_kwh?: number | null;
  amount_ks: number;
}

export default function Record(props: RecordProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.unbolded}>{props.date}</Typography>
      <div className={classes.content}>
        <Typography variant="h1" className={classes.item}>
          {props.used_kwh ? props.used_kwh + ' kWh |' : null} {props.amount_ks} Ks
        </Typography>
      </div>
    </div>
  );
};
