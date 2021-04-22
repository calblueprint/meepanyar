import { makeStyles, Snackbar as MaterialSnackbar, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

interface SnackbarProps {
  message: string;
  withFab?: boolean;
  noBottomMargin?: boolean;
  open?: boolean;
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: (props: SnackbarProps) => ({
      bottom: theme.spacing(props.noBottomMargin ? 1 : props.withFab ? 18 : 8),
    }),
  }),
);

function Snackbar(props: SnackbarProps) {
  const classes = styles(props);
  const [showSnackbar, setShowSnackbar] = useState(props.open);

  useEffect(() => {
    setShowSnackbar(props.open);
  }, [props.open]);

  return (
    <MaterialSnackbar
      autoHideDuration={5000} // 5 seconds
      className={classes.snackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={showSnackbar}
      onClose={() => setShowSnackbar(false)}
      message={props.message}
    />
  );
}

export default Snackbar;
