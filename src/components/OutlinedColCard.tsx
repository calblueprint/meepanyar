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
      padding: '8px 12px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
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
  numbers: number[];
  labels: string[];
  unit: string[];
  primary: boolean[];
}

export default function OutlinedColCard(props: CardProps) {
  const classes = useStyles();

  const getLabeledNumber = (number: number, label: string, unit: string, primary: boolean) => {
    return (
      <>
        <div className={classes.items}>
          <Typography variant="h4">{label}</Typography>
          <Typography variant="h3" color={primary ? 'primary' : 'inherit'}>
            {number} {unit}
          </Typography>
        </div>
        {primary ? <hr className={classes.divider} /> : <></>}
      </>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {props.numbers.map((num, index) =>
          getLabeledNumber(num, props.labels[index], props.unit[index], props.primary[index]),
        )}
      </div>
    </div>
  );
}
