import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';

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
        <TextField label={'Name'} id={'name'}/>
        <Checkbox label={'Select if customer is inactive'} />
        <Checkbox label={'Select if customer has meter'} />
        <TextField label={'Tariff Plan'} id={'tariff-plan'}/>
        <TextField label={'Reason'} id={'reason'}/>
        <Button label={'SAVE'} />
      </form>
    </BaseScreen>
  );
}

export default withStyles(styles)(EditCustomer);
