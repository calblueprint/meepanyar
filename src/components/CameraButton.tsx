import { Button as MaterialButton, InputLabel, Theme, Typography, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React from 'react';
import { navigateToCamera } from '../lib/utils/cameraUtils';


const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      backgroundColor: theme.palette.background.default,
      minHeight: 96,
      border: `1px dashed ${theme.palette.primary.light}`,
      radius: 5,
      padding: 0,
    },
  });

interface CameraButtonProps {
  classes: { buttonContainer: string };
  id: string;
  goBack: number;
  label?: string;
  photoUri?: string;
  preservedState?: {},
}

function CameraButton(props: CameraButtonProps) {
  const { classes, photoUri, preservedState, goBack } = props;
  return (
    <div>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <MaterialButton
        onClick={() => navigateToCamera({preservedState} || {}, goBack)}
        className={classes.buttonContainer}
        variant="contained"
        disableElevation
        fullWidth
      >
        {photoUri ? (
          <img style={{ width: '100%' }} src={photoUri} />
        ) : (
          <div>
            <Typography variant="button" color="primary">+ Add Photo</Typography>
          </div>
        )}
      </MaterialButton>
    </div>
  );
}

export default withStyles(styles)(CameraButton);
