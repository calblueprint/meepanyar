import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
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
      marginLeft: '-7px',
      padding: '0px 10px',
    },
  }),
);

interface CheckBoxProps {
  label: string;
  textField?: string | null;
}

export default function CheckBox(props: CheckBoxProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            icon={<div className={classes.checkIcon} />}
            checkedIcon={<CheckIcon className={`${classes.checkIcon} ${classes.checkedIcon}`} />}
          />
        }
        label={props.label}
      />
      {props.textField ? (
        <TextField
          className={classes.textField}
          id={props.textField}
          InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
          InputLabelProps={{ shrink: true }}
          color="primary"
          type="meter"
        />
      ) : null}
    </div>
  );
}
