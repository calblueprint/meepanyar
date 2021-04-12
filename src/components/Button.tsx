import { Button, CircularProgress, makeStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React from 'react';

interface MainButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  textButton?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    button: (props: MainButtonProps) => ({
      color: props.variant && props.variant != 'contained' ? undefined : 'white',
      borderWidth: 2,
      display: 'flex',
      borderRadius: 6,
      minHeight: 36,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      margin: '0 auto',
    }),
  }),
);

function MainButton(props: MainButtonProps) {
  const classes = styles(props);
  return (
    <Button
      startIcon={props.startIcon}
      fullWidth={props.fullWidth}
      disabled={props.disabled || props.loading}
      className={classes.button}
      type="submit"
      variant={props.variant || 'contained'}
      color="primary"
      disableElevation={true}
      onClick={props.onClick}
    >
      {props.loading ? <CircularProgress size={24} /> : props.label}
    </Button>
  );
}

export default MainButton;
