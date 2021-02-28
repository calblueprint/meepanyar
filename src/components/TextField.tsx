import { TextField, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';

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

  // TODO: @wangannie: make onChange not optional
interface TextFieldProps {
  classes: { textField: string };
  label: string;
  id: string;
  primary: boolean;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

function Field(props: TextFieldProps) {
  const { classes } = props;
  return (
    <div>
      <Typography variant="body1">{props.label}</Typography>
      <TextField
        className={classes.textField}
        id={props.id}
        InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
        InputLabelProps={{ shrink: true }}
        color={props.primary ? 'primary' : undefined}
        onChange={props.onChange}
      />
    </div>
  );
}
export default withStyles(styles)(Field);
