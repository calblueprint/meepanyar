import React from 'react';
import { Typography } from '@material-ui/core';
import BaseHeader from '../components/BaseComponents/BaseHeader';
import TextField from '../components/TextField';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, RouteComponentProps } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    header: {
      marginTop: '20px',
      color: theme.palette.text.primary,
    },
    content: {
      margin: '0 25px',
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    label: {
      marginTop: '-55px',
      marginBottom: '40px',
    },
  });

interface EditCustomerProps extends RouteComponentProps {
  classes: { root: string; header: string; content: string; label: string; };
  location: any;
}

function EditCustomer(props: EditCustomerProps) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <BaseHeader title="Edit Customer" leftIcon="backNav" />
      </div>
      <form noValidate className={classes.content}>
        <TextField label={"Name"} id={"name"} primary={true} />
        <Checkbox label={"Select if customer is inactive"} />
        <Checkbox label={"Select if customer has meter"} />
        <TextField label={"Tariff Plan"} id={"tarrif-plan"} primary={true} />
        <TextField label={"Reason"} id={"reason"} primary={true} />
        <Button label={"SAVE"} />
      </form>
    </div>
  );
}

export default withStyles(styles)(EditCustomer);
