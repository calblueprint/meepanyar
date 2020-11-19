import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '95%',
      margin: 'auto',
      marginTop: '2px',
      marginBottom: '15px',
    },
    textField: {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '5px',
      width: '100%',
      height: '30px',
      padding: '1px 10px',
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
      <Typography variant="body1">{props.label}</Typography>
      <TextField className={classes.textField}
        id={props.id}
        InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
        InputLabelProps={{ shrink: true }}
        color={props.primary ? "primary" : undefined}
      />
    </div>
  );
};
