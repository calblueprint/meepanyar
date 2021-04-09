import { Button as MaterialButton, FormHelperText, InputLabel, makeStyles, Theme, Typography } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React from 'react';
import { navigateToCamera } from '../lib/utils/cameraUtils';

interface CameraButtonProps {
  id: string;
  goBack: number;
  label?: string;
  photoUri?: string;
  preservedState?: {},
  error?: boolean,
  helperText?: string,
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    label: {
      marginLeft: 12,
    },
    buttonContainer: (props: CameraButtonProps) => ({
      backgroundColor: theme.palette.background.default,
      minHeight: 96,
      border: `1px dashed ${props.error ? theme.palette.error.main : theme.palette.primary.light}`,
      radius: 5,
      padding: 0,
    }),
  }));

function CameraButton(props: CameraButtonProps) {
  const classes = useStyles(props);
  const { photoUri, preservedState, goBack} = props;

  return (
    <div className={classes.margin}>
      <InputLabel error={props.error} htmlFor={props.id} className={classes.label}>{props.label}</InputLabel>
      <MaterialButton
        onClick={() => navigateToCamera({preservedState} || {}, goBack)}
        className={classes.buttonContainer}
        variant="contained"
        disableElevation
        fullWidth
        id={props.id}
      >
        {photoUri ? (
          <img width="100%" src={photoUri} alt="user-uploaded image" />
        ) : (
          <Typography variant="button" color={props.error ? "error" : "primary"}>+ Add Photo</Typography>
        )}
      </MaterialButton>
      {props.helperText && <FormHelperText error={props.error}>{props.helperText}</FormHelperText>}
    </div>
  );
}

export default CameraButton;
