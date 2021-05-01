import { InputAdornment, InputLabel, makeStyles, TextField } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import React, { useState } from 'react';
import { useInternationalization } from '../lib/i18next/translator';
import words from '../lib/i18next/words';

// TODO: @wangannie: make onChange not optional
interface TextFieldProps {
  label: string;
  id: string;
  name?: string;
  value?: string | number;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string | false;
  required? : boolean;
  type?: string;
  unit?: string;
  currency?: boolean;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
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
  const intl = useInternationalization();
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
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        placeholder={props.placeholder || props.label || ''}
        variant='outlined'
        fullWidth
        error={props.error}
        helperText={props.helperText}
        InputProps={{
          endAdornment:
          props.unit || props.currency ? (
            <InputAdornment position="end">{props.currency ? intl(words.ks) : `${props.unit}(${intl(words.s)})`}</InputAdornment>
          ) : props.error ? (
            <ErrorIcon color="error" />
          ) : undefined,
        }}
      />
    </div>
  );
}
export default Field;
