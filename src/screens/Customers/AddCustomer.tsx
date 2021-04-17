import { createStyles, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import { SiteRecord } from '../../lib/airtable/interface';
import { createCustomer } from '../../lib/airtable/request';
import { setCurrentCustomerIdInRedux } from '../../lib/redux/customerData';
import { selectAllTariffPlansArray } from '../../lib/redux/siteDataSlice';
import { EMPTY_CUSTOMER, MeterType } from '../../lib/redux/customerDataSlice';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';
import TariffPlanCard from '../Profile/components/TariffPlanCard';

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      width: '100%',
    },
    disabledFormControl: {
      width: '100%',
      backgroundColor: theme.palette.background.default,
    },
    textContainer: {
      padding: '2px 0px',
    },
    selectContainer: {
      padding: '10px 0px',
    },
    twoColumnContainer: {
      flexDirection: 'row',
      display: 'flex',
    },
    buttonContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '10px',
    },
    button: {
      width: '70%',
    },
  });

interface AddCustomerProps extends RouteComponentProps {
  classes: { formControl: string, disabledFormControl: string, twoColumnContainer: string, textContainer: string, selectContainer: string, buttonContainer: string, button: string, };
  currentSite: SiteRecord;
  location: any;
}

function AddCustomer(props: AddCustomerProps) {
  const { classes } = props;
  const history = useHistory();

  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [selectedMeterType, setSelectedMeterType] = useState(MeterType.INACTIVE);
  const [meterNumber, setMeterNumber] = useState(""); // TODO: @julianrkung Look into constraints on meter number input.
  const [selectedTariffPlanId, setSelectedTariffPlanId] = useState("");
  const [loading, setLoading] = useState(false);

  const currentSite = useSelector(selectCurrentSiteInformation);
  const tariffPlans = useSelector(selectAllTariffPlansArray);
  tariffPlans.sort(function(a, b) {
    return b.numberOfCustomers - a.numberOfCustomers;
  });

  if (!currentSite) {
    return <Redirect to={'/customers'} />
  }

  const handleSelectTariffPlan = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTariffPlanId(event.target.value as string);
  }

  const handleSelectMeterType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMeterType(event.target.value as MeterType);
  }

  // TODO: Add form input validation and error messaging
  const handleSubmit = (event: React.MouseEvent) => {

    // Set button as loading
    // TODO: error handling
    setLoading(true);

    // Prevent page refresh on submit
    event.preventDefault();

    // Make a deep copy of an empty customer record
    const customer = JSON.parse(JSON.stringify(EMPTY_CUSTOMER));
    customer.name = customerName;
    customer.customerNumber = parseInt(customerNumber);
    customer.meterType = selectedMeterType;
    customer.meterNumber = parseInt(meterNumber);
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

  const handleMeterNumberInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMeterNumber(event.target.value as string);
  }

  const handleCustomerNumberInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCustomerNumber(event.target.value as string);
  }

  const getTariffPlans = () => {
    let availableTariffPlans = tariffPlans;
    availableTariffPlans = availableTariffPlans.filter((plan) => plan.meterTypes && plan.meterTypes.includes(selectedMeterType));
    return (
      <Select onChange={handleSelectTariffPlan} label={'Tariff Plan'} value={selectedTariffPlanId}>
        {availableTariffPlans.map((plan) =>
          <MenuItem key={plan.id} value={plan.id}>
            <TariffPlanCard tariffPlan={plan} />
          </MenuItem>
        )}
      </Select>
    );
  }

  return (
    <BaseScreen title="Add New Customer" leftIcon="backNav">
      <BaseScrollView>
        <form noValidate onSubmit={() => false}>
          <div className={classes.twoColumnContainer}>
            <div style={{ marginRight: 10, flex: 2 }}>
              <TextField
                label={'Name'}
                id={'name'}
                placeholder={'e.g. Tom'}
                onChange={handleNameInput}
                value={customerName}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                label={'Number'}
                id={'number'}
                placeholder={'e.g. 12'}
                type="number"
                onChange={handleCustomerNumberInput}
                value={customerNumber}
                required
              />
            </div>
          </div>
          <div className={classes.selectContainer}>
            <FormControl
              required
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel>Meter Type</InputLabel>
              <Select onChange={handleSelectMeterType} label={'Meter Type'} value={selectedMeterType}>
                <MenuItem hidden value={MeterType.INACTIVE}>Inactive</MenuItem>
                <MenuItem value={MeterType.ANALOG_METER}>Analog Meter</MenuItem>
                <MenuItem value={MeterType.SMART_METER}>Smart Meter</MenuItem>
                <MenuItem value={MeterType.NO_METER}>No Meter</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.textContainer}>
            <TextField
              label={'Meter Number'}
              id={'meter-number'}
              placeholder={'Input'}
              type="number"
              value={meterNumber}
              onChange={handleMeterNumberInput}
              disabled={selectedMeterType === MeterType.INACTIVE || selectedMeterType === MeterType.NO_METER}
              required={selectedMeterType !== MeterType.INACTIVE && selectedMeterType !== MeterType.NO_METER}
            />
          </div>
          <div className={classes.selectContainer}>
            <FormControl
              variant="outlined"
              disabled={selectedMeterType === MeterType.INACTIVE}
              required={selectedMeterType !== MeterType.INACTIVE}
              className={ selectedMeterType === MeterType.INACTIVE ? classes.disabledFormControl : classes.formControl}
            >
              <InputLabel>Tariff Plan</InputLabel>
              {getTariffPlans()}
            </FormControl>
          </div>
          <div className={classes.buttonContainer}>
            <div className={classes.button}>
              <Button
                label={'Add'}
                onClick={handleSubmit}
                fullWidth
                loading={loading}
              />
            </div>
          </div>
        </form>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(AddCustomer);
