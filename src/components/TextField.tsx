import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '5px',
      width: '100%',
      height: '30px',
      padding: '1px 10px',
      marginBottom: '4px',
    },
    bolded: {
      fontWeight: 700,
    }
  }),
);

interface TextFieldProps {
  label: string,
  bold?: boolean,
}

export default function Field(props: TextFieldProps) {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="body1" className={props.bold ? classes.bolded : undefined}>{props.label}</Typography>
      <TextField className={classes.textField}
        InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
        InputLabelProps={{ shrink: true }}
        color="primary"
      />
    </div>
  );
};
