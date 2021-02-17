import React from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import TextField from '../../components/TextField';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, RouteComponentProps } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    header: {
      marginTop: '20px',
      color: theme.palette.text.primary,
    },
    content: {
      color: theme.palette.text.primary,
    },
  });

interface EditCustomerProps extends RouteComponentProps {
  classes: { header: string; content: string };
  location: any;
}

function EditCustomer(props: EditCustomerProps) {
  const { classes } = props;

  return (
    <BaseScreen title="Edit Customer" leftIcon="backNav">
      <form noValidate className={classes.content}>
        <TextField label={'Name'} />
        <Checkbox label={'Select if customer is inactive'} />
        <Checkbox label={'Select if customer has meter'} />
        <TextField label={'Tariff Plan'} />
        <TextField label={'Reason'} />
        <Button label={'SAVE'} />
      </form>
    </BaseScreen>
  );
}

export default withStyles(styles)(EditCustomer);
