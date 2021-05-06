import { Button as MaterialButton, FormHelperText, InputLabel, makeStyles, Theme, Typography } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React from 'react';
import { navigateToCamera } from '../lib/utils/cameraUtils';
import { useInternationalization } from '../lib/i18next/translator';
import words from '../lib/i18next/words';

interface CameraButtonProps {
  id: string;
  goBack?: number;
  label?: string;
  photoUri?: string;
  preservedState?: {};
  error?: boolean;
  helperText?: string | false;
  staticPreview?: boolean;
  required?: boolean;
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
      border: `1px dashed ${
        props.staticPreview
          ? theme.palette.divider
          : props.error
          ? theme.palette.error.main
          : theme.palette.primary.light
      }`,
      borderRadius: 6,
      padding: 0,
      overflow: 'hidden',
    }),
  }),
);

function CameraButton(props: CameraButtonProps) {
  const intl = useInternationalization(); 
  const classes = useStyles(props);
  const { photoUri, preservedState, goBack, staticPreview } = props;

  return (
    <div className={classes.margin}>
      <InputLabel
        required={props.required}
        error={props.error}
        disabled={staticPreview}
        htmlFor={props.id}
        className={classes.label}
      >
        {props.label}
      </InputLabel>
      <MaterialButton
        disabled={staticPreview}
        onClick={() => navigateToCamera({ preservedState } || {}, goBack)}
        className={classes.buttonContainer}
        variant="contained"
        disableElevation
        fullWidth
        id={props.id}
      >
        {photoUri ? (
          <img width="100%" src={photoUri} alt="user-uploaded image" />
        ) : (
          <Typography variant="button" color={props.error ? 'error' : 'primary'}>
            + {intl(words.add_x, words.photo)}
          </Typography>
        )}
      </MaterialButton>
      {props.helperText && <FormHelperText error={props.error}>{props.helperText}</FormHelperText>}
    </div>
  );
}

export default CameraButton;
