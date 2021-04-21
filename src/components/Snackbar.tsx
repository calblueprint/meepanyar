import { makeStyles, Snackbar as MaterialSnackbar, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsOnline } from '../lib/redux/userData';

interface SnackbarProps {
  message: string;
  withFab?: boolean;
  noBottomMargin?: boolean;
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: (props: SnackbarProps) => ({
      bottom: theme.spacing(props.noBottomMargin ? 1 : props.withFab ? 18: 8),
    }),
  }),
);

function Snackbar(props: SnackbarProps) {
  const classes = styles(props);
  const isOffline = !useSelector(selectIsOnline);
  const [showSnackbar, setShowSnackbar] = useState(isOffline);

  useEffect(() => {
    setShowSnackbar(isOffline);
  }, [isOffline]);

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
