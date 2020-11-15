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
    form: {
      margin: '10px -5px',
    },
    label: {
      marginTop: '-55px',
      marginBottom: '40px',
    },
  });

interface EditCustomerProps extends RouteComponentProps {
  classes: { root: string; header: string; content: string; form: string; label: string; };
  location: any;
}

function EditCustomer(props: EditCustomerProps) {
  const { classes, match } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <BaseHeader leftIcon="backNav" />
        <Typography className={classes.label} variant="h2">Edit Customer</Typography>
      </div>
      <div className={classes.content}>
        <form noValidate className={classes.form}>
          <TextField label={"Name"} id={"name"} primary={true} />
          <Checkbox label={"Select if customer is inactive"} id={"inactive"} />
          <Checkbox label={"Select if customer has meter"} id={"meter"} />
          <TextField label={"Tariff Plan"} id={"tarrif-plan"} primary={true} />
          <TextField label={"Reason"} id={"reason"} primary={true} />
          <Button label={"SAVE"} primary={true} />
        </form>
      </div>
    </div>
  );
}

export default withStyles(styles)(EditCustomer);
