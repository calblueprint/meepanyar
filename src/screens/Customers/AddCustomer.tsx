import { createStyles, FormControl, FormHelperText, MenuItem, Select, Theme } from '@material-ui/core';
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
    name: '',
    meterNumber: 0,
    tariffPlansId: '',
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
  });

interface AddCustomerProps extends RouteComponentProps {
  classes: { content: string };
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
    console.log("handling select!");
    setSelectedTariffPlan(event.target.value as string);
  }

  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();

    const customer = EMPTY_CUSTOMER;
    customer.name = customerName;
    customer.meterNumber = parseInt(meter);
    customer.isactive = !customerInactive;
    customer.tariffPlansId = selectedTariffPlan;
    addCustomer(customer);
    
    const cust = {
      ...customer,
      sitesId: currentSite.rid
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
        <FormControl>
            <Select inputProps={{ 'aria-label': 'Tariff Plan' }} onChange={handleSelectTariffPlan}>
              {tariffPlans.map((plan, index) =>
                <MenuItem key={index} value={plan.id}>{plan.name}</MenuItem>
                )}
            </Select>
            <FormHelperText>Tariff Plan {tariffPlans.length}</FormHelperText>
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
