import { createStyles, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import { CustomerRecord, SiteRecord } from '../../lib/airtable/interface';
import { createCustomer } from '../../lib/airtable/request';
import { addCustomer } from '../../lib/redux/siteData';
import { RootState } from '../../lib/redux/store';

// TODO: Move to utils file?
const EMPTY_CUSTOMER : CustomerRecord= {
    id: '',
    name: '',
    meterNumber: 0,
    tariffPlanId: '',
    isactive: false,
    hasmeter: false,
    outstandingBalance: '',
    meterReadingIds: [],
    meterReadings: [],
    paymentIds: [],
    payments: [],
    customerUpdateIds: [],
    customerUpdates: [],
    totalAmountBilledfromInvoices: 0,
    totalAmountPaidfromPayments: 0,
}

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

  const [selectedTariffPlan, setSelectedTariffPlan] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [meter, setMeter] = useState("");
  const [meterChecked, setMeterChecked] = useState(false);
  const [customerInactive, setCustomerInactive] = useState(false);

  const handleSelectTariffPlan = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTariffPlan(event.target.value as string);
  }

  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();

    const customer = EMPTY_CUSTOMER;
    customer.name = customerName;
    customer.meterNumber = parseInt(meter);
    customer.isactive = !customerInactive;
    customer.tariffPlanId = selectedTariffPlan;
    addCustomer(customer);
    
    const cust = {
      ...customer,
      siteId: currentSite.id
    }
    
    createCustomer(cust);
  }

  const handleNameInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCustomerName(event.target.value as string);
  }

  const handleMeterInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMeter(event.target.value as string);
  }

  const tariffPlans = currentSite.tariffPlans;

  return (
    <BaseScreen title="Add New Customer" leftIcon="backNav">
      <form noValidate className={classes.content} onSubmit={() => false}>
        <TextField label={'Name'} id={'name'} primary={true} onChange={handleNameInput} />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-tariff-plan-label">Select Tariff Plan</InputLabel>
          <Select label={"Select Tariff Plan"} id={'select-tariff-plan'} labelId = "select-tariff-plan-label" onChange={handleSelectTariffPlan}>
            {tariffPlans.map((plan, index) =>
                <MenuItem key={index} value={plan.id}>{plan.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Checkbox label={'Meter:'} textField={meterChecked ? 'meter': null} checkboxOnChange={() => setMeterChecked(!meterChecked)}textFieldOnChange={handleMeterInput}/>
        <Checkbox label={'Customer is inactive'} checkboxOnChange = {() => setCustomerInactive(!customerInactive)}/>
        <Button label={'Add'} onClick={(event) => handleSubmit(event)} />
      </form>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite
});

export default connect(mapStateToProps)(withStyles(styles)(AddCustomer));
