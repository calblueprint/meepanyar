import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
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
  styling?: string;
}

export default function TextWrapper(props: TextWrapperProps): JSX.Element {
  const classes = useStyles();
  const typographyClasses = props.bold ? classes.bold : undefined;
  const rootClass = props.styling ? `${classes.root} ${props.styling}` : classes.root;

  const getLabeledNumber = (number: number, label: string, index: number) => {
    return (
      <div key={label} className={classes.items}>
        <Typography className={typographyClasses} color={props.color ? props.color : 'inherit'} variant="body1">
          {label}
        </Typography>
        <Typography className={typographyClasses} color={props.color ? props.color : 'inherit'} variant="body1">
          {number + (props.units ? props.units[index] : '')}
        </Typography>
      </div>
    );
  };

  return (
    <div className={rootClass}>
      {props.title ? (
        <Typography className={classes.titleText} variant="h2" align="left">
          {props.title}
        </Typography>
      ) : null}
      {props.numbers.map((num, index) => getLabeledNumber(num, props.labels[index], index))}
    </div>
  );
}
