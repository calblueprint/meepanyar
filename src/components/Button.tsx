import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      color: 'white',
      display: 'flex',
      borderRadius: '20px',
      width: '187px',
      height: '48px',
      marginTop: '10%',
      margin: '0 auto',
    },
  }),
);

interface MainButtonProps {
  label: string,
}

export default function MainButton(props: MainButtonProps) {
  const classes = useStyles();
  return (
    <Button className={classes.button} type="submit" variant="contained" color="primary" disableElevation={true}>
      {props.label}
    </Button>
  );
};
