import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
  Typography
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import React, { useState } from 'react';
import Button from './Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: 64,
      color: theme.palette.primary.light,
    },
    dialogContents: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
);

interface OfflineDialogProps {
  open: boolean;
  headingText?: string;
  bodyText?: string;
  closeAction?: () => void;
}

export default function OfflineDialog(props: OfflineDialogProps): JSX.Element {
  const classes = useStyles();
  const { headingText, bodyText, closeAction } = props;
  const [open, setOpen] = useState(props.open);

  const handleClose = () => {
    setOpen(false);
    if (closeAction) {
      closeAction();
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className={classes.dialogContents}>
        <CloudOffIcon color="primary" className={classes.icon} />
        <DialogTitle>
          <Typography variant="body1" align="center">
            {headingText}
          </Typography>
        </DialogTitle>
        <DialogContentText align="center">{bodyText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button fullWidth label="Go Back" onClick={() => handleClose()} />
      </DialogActions>
    </Dialog>
  );
}
