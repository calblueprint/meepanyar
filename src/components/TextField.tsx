import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '95%',
      margin: 'auto',
      marginBottom: '-10px',
    },
    content: {
      marginTop: '25px',
    },
    item: {
      marginTop: '-20px',
      marginBottom: '20px',
      paddingBottom: '5px',
      borderBottom: '1px solid #e5e5e5',
    },
    textField: {
      backgroundColor: 'white',
      border: '1px solid #ff922e',
      borderRadius: '5px',
      width: '100%',
      height: '30px',
      padding: '1px 10px',
      marginTop: '2px',
      marginBottom: '25px',
    },
  }),
);

interface TextFieldProps {
  label: string,
  id: string,
  primary: boolean,
}

export default function Field(props: TextFieldProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4">{props.label}</Typography>
      <TextField className={classes.textField}
        id={props.id}
        InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
        InputLabelProps={{ shrink: true }}
        color={props.primary ? "primary" : undefined}
      />
    </div>
  );
};
