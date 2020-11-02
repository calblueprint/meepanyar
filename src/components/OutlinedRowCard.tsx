import React from 'react';
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
      padding: '15px 5px',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-around',
    },
    items: {
      flex: '1',
      color: theme.palette.text.primary,
    },
  }),
);

interface CardProps {
  numbers: number[];
  labels: string[];
}

export default function OutlinedRowCard(props: CardProps) {
  const classes = useStyles();

  const getLabeledNumber = (number: number, label: string) => {
    return (
      <div className={classes.items}>
        <Typography variant="h3">{number}</Typography>
        <Typography variant="h4">{label}</Typography>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {props.numbers.map((num, index) => getLabeledNumber(num, props.labels[index]))}
      </div>
    </div>
  );
}
