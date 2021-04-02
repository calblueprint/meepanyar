import { Button as MaterialButton, InputLabel, Theme, Typography, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import React from 'react';
import { navigateToCamera } from '../lib/utils/cameraUtils';

const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      backgroundColor: '#F7F9FC',
      minHeight: 130,
      border: `3.5px dashed ${theme.palette.divider}`,
      radius: '6px',
      padding: 0,
      width: '100%',
    },
  });

interface CameraButtonProps {
  classes: { buttonContainer: string };
  id: string;
  label?: string;
  photoUri?: string;
  preservedState?: {},
}

function CameraButton(props: CameraButtonProps) {
  const { classes, photoUri, preservedState } = props;
  return (
    <div>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <MaterialButton
        onClick={() => navigateToCamera({preservedState} || {})}
        className={classes.buttonContainer}
        variant="contained"
        color="primary"
        disableElevation={true}
      >
        {photoUri ? (
          <img style={{ width: '100%' }} src={photoUri} />
        ) : (
          <div>
            <Typography color="primary">
              <PhotoLibraryIcon />
            </Typography>
            <Typography variant="h2" color="primary">
              Add Photo
            </Typography>
          </div>
        )}
      </MaterialButton>
    </div>
  );
}

export default withStyles(styles)(CameraButton);
