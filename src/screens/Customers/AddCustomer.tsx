import React from 'react';
import { Typography } from '@material-ui/core';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import TextField from '../../components/TextField';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, RouteComponentProps } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    checkBoxes: {
      marginLeft: '2px',
    },
    content: {
      margin: '0 25px',
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
  });

interface AddCustomerProps extends RouteComponentProps {
  classes: { root: string; checkBoxes: string; content: string };
  location: any;
}

function AddCustomer(props: AddCustomerProps) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <BaseHeader title="Add New Customer" leftIcon="backNav" />
      <form noValidate className={classes.content}>
        <TextField label={'Name'} />
        {/* <div className={classes.checkBoxes}> */}
        <Checkbox label={'Select if customer is inactive'} />
        <Checkbox label={'Meter:'} textField={'meter'} />
        {/* </div> */}
        <TextField label={'Tariff Plan'} />
        <Button label={'ADD'} />
      </form>
    </div>
  );
}

export default withStyles(styles)(AddCustomer);
