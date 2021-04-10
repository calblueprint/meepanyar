import { createStyles, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import { SiteRecord } from '../../lib/airtable/interface';
import { createCustomer } from '../../lib/airtable/request';
import { setCurrentCustomerIdInRedux } from '../../lib/redux/customerData';
import { selectAllTariffPlansArray } from '../../lib/redux/siteDataSlice';
import { EMPTY_CUSTOMER } from '../../lib/redux/customerDataSlice';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    formControl: {
      width: '100%',
    },
  });

interface AddCustomerProps extends RouteComponentProps {
  classes: { content: string, formControl: string };
  location: any;
  currentSite: SiteRecord;
}


function AddCustomer(props: AddCustomerProps) {
  const { classes } = props;
  const history = useHistory();

  const [selectedTariffPlanId, setSelectedTariffPlanId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [hasMeter, setHasMeter] = useState(false);
  // TODO: @julianrkung Look into constraints on meter number input.
  const [meterNumber, setMeterNumber] = useState("");
  const [customerInactive, setCustomerInactive] = useState(false);
  const currentSite = useSelector(selectCurrentSiteInformation);
  const tariffPlans = useSelector(selectAllTariffPlansArray);

  if (!currentSite) {
    return <Redirect to={'/customers'} />
  }

  const handleSelectTariffPlan = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTariffPlanId(event.target.value as string);
  }

  // TODO: Add form input validation and error messaging
  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();

    // Make a deep copy of an empty customer record
    const customer = JSON.parse(JSON.stringify(EMPTY_CUSTOMER));
    customer.name = customerName;
    customer.meterNumber = parseInt(meterNumber);
    customer.isactive = !customerInactive;
    customer.tariffPlanId = selectedTariffPlanId;

    // Add other info necessary to create the Airtable record
    createCustomer({
      ...customer,
      siteId: currentSite.id
    }).then((id) => {
      setCurrentCustomerIdInRedux(id);
      history.replace(`customer`);
    });
  }

  const handleNameInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCustomerName(event.target.value as string);
  }

  const handleMeterInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMeterNumber(event.target.value as string);
  }

  return (
    <BaseScreen title="Add New Customer" leftIcon="backNav">
      <form noValidate className={classes.content} onSubmit={() => false}>
        <TextField label={'Name'} id={'name'} onChange={handleNameInput} />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-tariff-plan-label">Select Tariff Plan</InputLabel>
          <Select label={"Select Tariff Plan"} id={'select-tariff-plan'} labelId="select-tariff-plan-label" onChange={handleSelectTariffPlan}>
            {tariffPlans.map((plan) =>
              <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Checkbox label={'Meter:'} textField={hasMeter} checkboxOnChange={() => setHasMeter(!hasMeter)} textFieldOnChange={handleMeterInput} />
        <Checkbox label={'Customer is inactive'} checkboxOnChange={() => setCustomerInactive(!customerInactive)} />
        <Button label={'Add'} onClick={handleSubmit} />
      </form>
    </BaseScreen>
  );
}

export default withStyles(styles)(AddCustomer);
