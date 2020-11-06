import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '15px 0',
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
      flex: '1',
    },
    divider: {
      margin: '0 0 5px 0',
    },
    confirmButton: {
        borderRadius: '15px',
        borderColor: theme.palette.grey[400],
        marginTop: '-10px',
        float: 'right',
      },
  }),
);

interface TextWrapperProps {
    title: string;
    numbers: number[];
    labels: string[];
    units?: string[];
}

export default function TextWrapper(props: TextWrapperProps) {
  const classes = useStyles();

  const getLabeledNumber = (number: number, label: string, index: number) => {
    return (
      <div className={classes.items}>
          <Typography variant="h3">{label}</Typography>
          <Typography variant="h3">{number + (props.units ? props.units[index] : '')}</Typography>
      </div>
    );
  };

  return (
    <div className={classes.root}>
        <Typography>{props.title}</Typography>
        {props.numbers.map((num, index) => getLabeledNumber(num, props.labels[index], index))}
    </div>
  );
}