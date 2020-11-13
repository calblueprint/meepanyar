import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '15px 0',
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: '6px',
    },
    content: {
      padding: '8px 12px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
    },
    itemWrapper: {
      display: 'flex',
    },
    items: {
      color: theme.palette.text.primary,
      margin: '5px',
    },
    divider: {
      margin: '0 0 5px 0',
    },
    confirmButton: {
      borderRadius: '15px',
      borderColor: theme.palette.grey[400],
      marginTop: '-10px',
      float: 'right',
    },
  }),
);

interface ModalProps {
  isOpen: boolean;
  modalContents: JSX.Element;
}

export default function ConfirmModal(props: ModalProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Modal open={props.isOpen}>{props.modalContents}</Modal>
    </div>
  );
}
