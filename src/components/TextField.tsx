import { InputAdornment, InputLabel, makeStyles, TextField } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import React, { useState } from 'react';


  // TODO: @wangannie: make onChange not optional
interface TextFieldProps {
  label: string;
  id: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  primary?: boolean; // TODO @wangannie: REMOVE
  error?: boolean;
  helperText?: string | false;
  required? : boolean;
  type?: string;
  unit?: string;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(1),
    },
    label:{
      marginLeft: 12,
    },
    textField: (props: TextFieldProps) => ({
      backgroundColor: props.disabled ? theme.palette.background.default : theme.palette.common.white,
      borderRadius: 5,
    }),
  }));

// TODO: Rename component
function Field(props: TextFieldProps) {
  const classes = styles(props);
  const [focused, setFocused] = useState(false);

  return (
    <div className={classes.margin}>
      <InputLabel focused={focused} disabled={props.disabled} required={props.required} error={props.error} className={classes.label} htmlFor={props.id}>{props.label}</InputLabel>
      <TextField
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={props.type}
        name={props.name}
        id={props.id}
        required={props.required}
        className={classes.textField}
        InputLabelProps={{ shrink: true }}
        value={props.value ? props.value : undefined}
        onChange={props.onChange}
        disabled={props.disabled}
        placeholder={props.placeholder || props.label || ''}
        variant='outlined'
        fullWidth
        error={props.error}
        helperText={props.helperText}
        // TODO: check with designs
        InputProps={{
          endAdornment: props.unit? <InputAdornment position="end">{`${props.unit}(s)`}</InputAdornment> : props.error ? <ErrorIcon color="error" /> : undefined,
        }}
      />
    </div>
  );
}
export default Field;
