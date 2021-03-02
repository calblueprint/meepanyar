import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    textField: {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '5px',
      width: '100%',
      height: '30px',
      padding: '1px 10px',
      marginBottom: '0.5rem',
    },
  });

interface TextFieldProps {
  classes: { textField: string };
  label: string;
}

function Field(props: TextFieldProps) {
  const { classes } = props;
  return (
    <div>
      <Typography variant="body1">{props.label}</Typography>
      <TextField
        className={classes.textField}
        InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
        InputLabelProps={{ shrink: true }}
      />
    </div>
  );
}
export default withStyles(styles)(Field);
