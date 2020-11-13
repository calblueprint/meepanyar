import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 15px',
      display: 'flex',
      alignItems:'center',
      justifyContent: 'center',
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
    <Modal className={classes.root} open={props.isOpen}>{props.modalContents}</Modal>
  );
}
