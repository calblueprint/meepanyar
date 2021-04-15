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
    inline: {
      display: 'inline-flex',
      width: '100%',
    },
    textContainer: {
      padding: '2px 0px',
    },
    selectContainer: {
      padding: '10px 0px',
    },
    nameInput: {
      width: '130%',
      paddingRight: '10px',
    },
    numberInput: {
      width: '50%',
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
    tariffLabel: {
      whiteSpace: 'pre-line',
    },
    tariffInfo: {
      whiteSpace: 'pre-line',
    },
  });

interface AddCustomerProps extends RouteComponentProps {
  classes: { formControl: string, nameInput: string, numberInput: string, textContainer: string, selectContainer: string, buttonContainer: string, button: string, inline: string, tariffLabel: string, tariffInfo: string };
  currentSite: SiteRecord;
  location: any;
}


function AddCustomer(props: AddCustomerProps) {
  const { classes } = props;
  const history = useHistory();

  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [selectedMeterType, setSelectedMeterType] = useState(MeterType.ANALOG_METER);
  const [meterNumber, setMeterNumber] = useState(""); // TODO: @julianrkung Look into constraints on meter number input.
  const [selectedTariffPlanId, setSelectedTariffPlanId] = useState("");

  const currentSite = useSelector(selectCurrentSiteInformation);
  const tariffPlans = useSelector(selectAllTariffPlansArray);

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

  return (
    <BaseScreen title="Add New Customer" leftIcon="backNav">
      <BaseScrollView>
        <form noValidate onSubmit={() => false}>
          <div className={classes.textContainer}>
            <div className={classes.inline}>
              <div className={classes.nameInput}>
                <TextField
                  label={'Name'}
                  id={'name'}
                  placeholder={'e.g. Tom'}
                  onChange={handleNameInput}
                  required
                />
              </div>
              <div className={classes.numberInput}>
                <TextField
                  label={'Number'}
                  id={'number'}
                  placeholder={'e.g. 12'}
                  type="number"
                  onChange={handleCustomerNumberInput}
                  required
                />
              </div>
            </div>
          </div>
          <div className={classes.selectContainer}>
            <FormControl required variant="outlined" className={classes.formControl}>
              <InputLabel>Meter Type</InputLabel>
              <Select onChange={handleSelectMeterType}>
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
              onChange={handleMeterNumberInput}
              disabled={selectedMeterType === MeterType.NO_METER}
              required={selectedMeterType != MeterType.NO_METER}
            />
          </div>
          <div className={classes.selectContainer}>
            <FormControl required variant="outlined" className={classes.formControl}>
              <InputLabel>Tariff Plan</InputLabel>
              <Select onChange={handleSelectTariffPlan}>
                {tariffPlans.map((plan) =>
                  <MenuItem key={plan.id} value={plan.id}>
                    <TariffPlanCard tariffPlan={plan} />
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
          <div className={classes.buttonContainer}>
            <div className={classes.button}>
              <Button label={'Add'} onClick={handleSubmit} fullWidth />
            </div>
          </div>
        </form>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(AddCustomer);
