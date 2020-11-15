import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, TextField, Checkbox } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginTop: '10px',
      marginLeft: '-6px',
      marginBottom: '14px',
    },
    check: {
      float: 'left',
      marginLeft: '5%',
      size: 'small',
    },
    checkIcon: {
      backgroundColor: 'white',
      width: '20px',
      height: '20px',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '3px',
      position: 'absolute',
    },
    checkedIcon: {
      position: 'absolute',
      color: theme.palette.primary.main,
      width: '26px',
      height: '26px',
    },
    label: {
      position: 'absolute',
      textAlign: 'left',
      padding: '6px 0px',
      width: '300px',
      marginLeft: '50px',
      marginTop: '-5px',
    },
    textField: {
      position: 'absolute',
      backgroundColor: 'white',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '5px',
      width: '76px',
      height: '30px',
      marginLeft: '90px',
      marginTop: '-6px',
      padding: '0px 10px',
    },
  }),
);

interface CheckBoxProps {
  label: string,
  id: string,
  textField?: string | null,
}

export default function CheckBox(props: CheckBoxProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Checkbox className={classes.check}
        id={props.id}
        value="checkedA"
        color="primary"
        inputProps={{ 'aria-label': 'Checkbox A' }}
        icon={<div className={classes.checkIcon} />}
        checkedIcon={<CheckBoxIcon className={classes.checkedIcon} />}
      />
      <Typography variant="h4" className={classes.label}>{props.label}</Typography>
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
