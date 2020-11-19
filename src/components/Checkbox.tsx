import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, TextField, Checkbox } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginTop: '5px',
      marginLeft: '30px',
      marginBottom: '10px',
    },
    checkIcon: {
      marginLeft: '-20px',
      position: 'absolute',
      width: '20px',
      height: '20px',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '3px',
    },
    checkedIcon: {
      marginLeft: '-20px',
      position: 'absolute',
      color: theme.palette.primary.main,
      width: '26px',
      height: '26px',
    },
    label: {
      position: 'absolute',
      width: '300px',
      marginLeft: '20px',
    },
    textField: {
      position: 'absolute',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '5px',
      width: '76px',
      height: '30px',
      marginLeft: '70px',
      marginTop: '-6px',
      padding: '0px 10px',
    },
  }),
);

interface CheckBoxProps {
  label: string,
  textField?: string | null,
}

export default function CheckBox(props: CheckBoxProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControlLabel control={
        <Checkbox
          color="primary"
          icon={<div className={classes.checkIcon} />}
          checkedIcon={<CheckBoxIcon className={classes.checkedIcon} />}
        />
      } label={props.label} />
      { props.textField ?
        <TextField className={classes.textField}
          id={props.textField}
          InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
          InputLabelProps={{ shrink: true }}
          color="primary"
          type="meter"
        />
         : null }
    </div>
  );
};
