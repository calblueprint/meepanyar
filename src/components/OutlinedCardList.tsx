import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '10px',
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
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    items: {
      width: '100px',
      color: theme.palette.text.primary,
      margin: '5px',
    },
  }),
);

interface CardProps {
  numbers: number[];
  labels: string[];
  unit: string[];
  primary: boolean;
  rightIcon?: JSX.Element;
}

export default function OutlinedColCard(props: CardProps) {
  const classes = useStyles();

  const getLabeledNumber = (number: number, label: string, unit: string, primary: boolean, rightIcon: JSX.Element) => {
    return (
      <div className={classes.itemWrapper}>
        <div className={classes.items}>
          <Typography variant="h4">{label}</Typography>
          <Typography variant="h3" color={primary ? 'primary' : 'inherit'}>
            {number} {unit}
          </Typography>
        </div>
        {rightIcon}
      </div>
    );
  };

  const rightIcon = props.rightIcon ? props.rightIcon : <></>;
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {props.numbers.map((num, index) => getLabeledNumber(num, props.labels[index], props.unit[index], props.primary, rightIcon))}
      </div>
    </div>
  );
}
