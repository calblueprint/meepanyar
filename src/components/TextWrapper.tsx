import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 0',
    },
    items: {
      display: 'flex',
      flex: '1',
      justifyContent: 'space-between',
      margin: '2px 0px',
    },
    titleText: {
      color: '#6A6A6A',
      margin: '10px 0',
    },
    bold: {
      fontWeight: 700,
    },
  }),
);

interface TextWrapperProps {
  title?: string;
  numbers: number[];
  labels: string[];
  units?: string[];
  color?: 'inherit' | 'primary' | 'textSecondary';
  bold?: boolean;
}

export default function TextWrapper(props: TextWrapperProps) {
  const classes = useStyles();

  const getLabeledNumber = (number: number, label: string, index: number) => {
    return (
      <div className={classes.items}>
        {props.bold ? (
          <>
            <Typography className={classes.bold} color={props.color ? props.color : 'inherit'} variant="h4">
              {label}
            </Typography>
            <Typography className={classes.bold} color={props.color ? props.color : 'inherit'} variant="h4">
              {number + (props.units ? props.units[index] : '')}
            </Typography>
          </>
        ) : (
          <>
            <Typography color={props.color ? props.color : 'inherit'} variant="h4">
              {label}
            </Typography>
            <Typography color={props.color ? props.color : 'inherit'} variant="h4">
              {number + (props.units ? props.units[index] : '')}
            </Typography>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {props.title ? (
        <Typography className={classes.titleText} variant="h2" align="left">
          {props.title}
        </Typography>
      ) : null}
      {props.numbers.map((num, index) => getLabeledNumber(num, props.labels[index], index))}
    </div>
  );
}
