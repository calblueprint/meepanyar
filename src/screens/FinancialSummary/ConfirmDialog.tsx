import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: '0 15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.common.white,
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: '15px',
    },
  }),
);

interface DialogProps {
  isOpen: boolean;
  dialogContents: JSX.Element;
}

export default function ConfirmDialog(props: DialogProps): JSX.Element {
  const classes = useStyles();

  return (
    <Dialog classes={{paper: classes.paper}} open={props.isOpen}>
      {props.dialogContents}
    </Dialog>
  );
}
