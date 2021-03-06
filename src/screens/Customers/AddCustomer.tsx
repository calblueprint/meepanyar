import { createStyles, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import { SiteRecord } from '../../lib/airtable/interface';
import { createCustomer } from '../../lib/airtable/request';
import { addCustomerToRedux } from '../../lib/redux/siteData';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { RootState } from '../../lib/redux/store';
import { EMPTY_CUSTOMER } from '../../lib/utils/customerUtils';

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
  classes: { content: string, formControl: string};
  location: any;
  currentSite: SiteRecord;
}


function AddCustomer(props: AddCustomerProps) {
  const { classes, currentSite } = props;

  const [selectedTariffPlanId, setSelectedTariffPlanId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [hasMeter, setHasMeter] = useState(false);
  // TODO: @julianrkung Look into constraints on meter number input.
  const [meterNumber, setMeterNumber] = useState("");
  const [customerInactive, setCustomerInactive] = useState(false);

  const handleSelectTariffPlan = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTariffPlanId(event.target.value as string);
  }

  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();

    const customer = JSON.parse(JSON.stringify(EMPTY_CUSTOMER));
    customer.name = customerName;
    customer.meterNumber = parseInt(meterNumber);
    customer.isactive = !customerInactive;
    customer.tariffPlanId = selectedTariffPlanId;
    addCustomerToRedux(customer);
    
    // Add other info necessary to create the Airtable record
    createCustomer({
      ...customer,
      siteId: currentSite.id
    });
  }

  const handleNameInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCustomerName(event.target.value as string);
  }

  const handleMeterInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMeterNumber(event.target.value as string);
  }

  const tariffPlans = currentSite.tariffPlans;

  return (
    <BaseScreen title="Add New Customer" leftIcon="backNav">
      <form noValidate className={classes.content} onSubmit={() => false}>
        <TextField label={'Name'} id={'name'} primary={true} onChange={handleNameInput} />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-tariff-plan-label">Select Tariff Plan</InputLabel>
          <Select label={"Select Tariff Plan"} id={'select-tariff-plan'} labelId = "select-tariff-plan-label" onChange={handleSelectTariffPlan}>
            {tariffPlans.map((plan) =>
                <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Checkbox label={'Meter:'} textField={hasMeter ? 'meter': null} checkboxOnChange={() => setHasMeter(!hasMeter)}textFieldOnChange={handleMeterInput}/>
        <Checkbox label={'Customer is inactive'} checkboxOnChange = {() => setCustomerInactive(!customerInactive)}/>
        <Button label={'Add'} onClick={handleSubmit} />
      </form>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite || EMPTY_SITE
});

export default connect(mapStateToProps)(withStyles(styles)(AddCustomer));
