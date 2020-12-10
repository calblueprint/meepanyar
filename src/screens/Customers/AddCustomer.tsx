import React from 'react';
import { Typography } from '@material-ui/core';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import TextField from '../../components/TextField';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
  });

interface AddCustomerProps extends RouteComponentProps {
  classes: { content: string };
  location: any;
}

function AddCustomer(props: AddCustomerProps) {
  const { classes } = props;

  return (
    <BaseScreen title="Add New Customer" leftIcon="backNav">
      <form noValidate className={classes.content}>
        <TextField label={'Name'} id={'name'} primary={true} />
        <Checkbox label={'Select if customer is inactive'} />
        <Checkbox label={'Meter:'} textField={'meter'} />
        <TextField label={'Tariff Plan'} id={'tarrif-plan'} primary={true} />
        <Button label={'ADD'} />
      </form>
    </BaseScreen>
  );
}

export default withStyles(styles)(AddCustomer);
