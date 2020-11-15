import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginTop: '10px',
      marginLeft: '-6px',
      marginBottom: '14px',
    },
    button: {
      color: 'white',
      position: 'absolute',
      fontSize: '12px',
      fontWeight: 'bold',
      borderRadius: '20px',
      width: '187px',
      height: '48px',
      margin: '0 auto',
      right: 0,
      left: 0,
      top: '60%',
      textTransform: 'none',
    },
  }),
);

interface CheckBoxProps {
  label: string,
  primary: boolean,
}

export default function CheckBox(props: CheckBoxProps) {
  const classes = useStyles();
  return (
    <Button className={classes.button} type="submit" variant="contained" color={props.primary ? "primary" : "inherit"}>
      {props.label}
    </Button>
  );
};
