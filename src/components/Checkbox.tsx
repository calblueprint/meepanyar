import { Checkbox, TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    checkIcon: {
      width: '20px',
      height: '20px',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '5px',
    },
    checkedIcon: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    textField: {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '5px',
      width: '76px',
      height: '30px',
      margin: '0.25rem 0 0 -7px',
      padding: '0px 10px',
    },
  });


interface CheckBoxProps {
  classes: { root: string; checkIcon: string; checkedIcon: string; textField: string };
  label: string;
  checked?: boolean;
  checkboxOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textField?: boolean;
  textFieldValue?: number | null;
  textFieldOnChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

// TODO: Rename component
function CheckBox(props: CheckBoxProps) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            icon={<div className={classes.checkIcon} />}
            checked={props.checked ? props.checked : undefined}
            checkedIcon={<CheckIcon className={`${classes.checkIcon} ${classes.checkedIcon}`} />}
            onChange={props.checkboxOnChange}
          />
        }
        label={props.label}
      />
      {props.textField ? (
        <TextField
          className={classes.textField}
          InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
          InputLabelProps={{ shrink: true }}
          color="primary"
          type="meter"
          value={props.textFieldValue ? props.textFieldValue : undefined}
          onChange={props.textFieldOnChange}
        />
      ) : null}
    </div>
  );
}

export default withStyles(styles)(CheckBox);
