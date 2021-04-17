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
import { EMPTY_CUSTOMER, MeterType } from '../../lib/redux/customerDataSlice';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
import moment from 'moment';

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
  const intl = useInternationalization(); 
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
    customer.startingMeterReading = 0;
    customer.startingMeterLastChanged = moment().toISOString();
    customer.meterType = MeterType.ANALOG_METER; // TODO: Change so you pick meter

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
    <BaseScreen title={intl(words.add_new_customer)} leftIcon="backNav">
      <form noValidate className={classes.content} onSubmit={() => false}>
        <TextField label={intl(words.name)} id={'name'} onChange={handleNameInput} />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-tariff-plan-label">{intl(words.select_tariff_plan)}</InputLabel>
          <Select label={intl(words.select_tariff_plan)} id={'select-tariff-plan'} labelId="select-tariff-plan-label" onChange={handleSelectTariffPlan}>
            {tariffPlans.map((plan) =>
              <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Checkbox label={`${intl(words.meter)}:`} textField={hasMeter} checkboxOnChange={() => setHasMeter(!hasMeter)} textFieldOnChange={handleMeterInput} />
        <Checkbox label={`${intl(words.customer_is_inactive)}`} checkboxOnChange={() => setCustomerInactive(!customerInactive)} />
        <Button label={intl(words.add_customer)} onClick={handleSubmit} />
      </form>
    </BaseScreen>
  );
}

export default withStyles(styles)(AddCustomer);
