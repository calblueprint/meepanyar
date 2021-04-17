import { createStyles, FormControl, InputLabel, Theme, MenuItem, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory, Redirect } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import { updateCustomer } from '../../lib/airtable/request';
import { CustomerRecord, CustomerUpdateRecord } from '../../lib/airtable/interface';
import { formatDateStringToLocal } from '../../lib/moment/momentUtils';
import { EMPTY_CUSTOMER, setCurrentCustomerId } from '../../lib/redux/customerDataSlice';
import { selectAllTariffPlansArray } from '../../lib/redux/siteDataSlice';
import { selectCurrentUserId } from '../../lib/redux/userData';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

const styles = (theme: Theme) =>
  createStyles({
    header: {
      marginTop: '20px',
      color: theme.palette.text.primary,
    },
    content: {
      color: theme.palette.text.primary,
    },
    formControl: {
      width: '100%',
    },
  });

interface EditCustomerProps extends RouteComponentProps {
  classes: { header: string; content: string; formControl: string; };
  location: any;
}

function EditCustomer(props: EditCustomerProps) {
  const intl = useInternationalization();
  const { classes } = props;
  const history = useHistory();

  const currentCustomer = useSelector(selectCurrentCustomer) || EMPTY_CUSTOMER;
  const tariffPlans = useSelector(selectAllTariffPlansArray);
  const userId = useSelector(selectCurrentUserId);

  const [selectedTariffPlanId, setSelectedTariffPlanId] = useState(currentCustomer.tariffPlanId);
  const [customerName, setCustomerName] = useState(currentCustomer.name);
  const [explanation, setExplanation] = useState("");
  const [hasMeter, setHasMeter] = useState(currentCustomer.hasmeter);
  // TODO: @julianrkung Look into constraints on meter number input.
  const [meterNumber, setMeterNumber] = useState(currentCustomer.meterNumber);
  const [customerInactive, setCustomerInactive] = useState(!currentCustomer.isactive);

  if (currentCustomer === EMPTY_CUSTOMER) {
    return <Redirect to={'/customers'} />;
  }

  const handleSelectTariffPlan = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTariffPlanId(event.target.value as string);
  }

  // TODO: Add form input validation and error messaging
  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();

    // Add other info necessary to create the Airtable record
    const customerUpdate: CustomerUpdateRecord = {
      id: '',
      dateUpdated: formatDateStringToLocal((new Date()).toString()),
      customerId: currentCustomer.id,
      explanation: explanation,
      userId: userId,
    };

    const recordUpdates = {
      name: customerName,
      isactive: !customerInactive,
      tariffPlanId: selectedTariffPlanId,
      hasmeter: hasMeter
    }

    // TODO: add error handling
    // We goBack instead of replace so there aren't 2 
    // "/customers/customer" routes in the history stack
    updateCustomer(currentCustomer.id, recordUpdates, customerUpdate).then(() => {
      setCurrentCustomerId(currentCustomer.id);
      history.goBack();
    });
  }

  const handleNameInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCustomerName(event.target.value as string);
  }

  const handleExplanationInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setExplanation(event.target.value as string);
  }

  const handleMeterInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMeterNumber(event.target.value as number);
  }

  return (
    <BaseScreen title={intl(words.edit_customer)} leftIcon="backNav">
      <form noValidate className={classes.content}>
        <TextField label={intl(words.name)} id={'name'} value={customerName} onChange={handleNameInput} />
        <Checkbox label={intl(words.select_if_x, words.customer_is_inactive)} checked={customerInactive} checkboxOnChange = {() => setCustomerInactive(!customerInactive)} />
        <Checkbox label={intl(words.select_if_x, words.has_meter)} checked={hasMeter} textField={hasMeter} textFieldValue={meterNumber} checkboxOnChange={() => setHasMeter(!hasMeter)} textFieldOnChange={handleMeterInput}/>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-tariff-plan-label">{intl(words.select_tariff_plan)}</InputLabel>
          <Select label={intl(words.select_tariff_plan)} id={'select-tariff-plan'} labelId = "select-tariff-plan-label" value={selectedTariffPlanId} onChange={handleSelectTariffPlan}>
            {tariffPlans.map((plan) =>
                <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <TextField label={intl(words.explanation)} id={'explanation'} onChange={handleExplanationInput}/>
        <Button label={intl(words.save)} onClick={handleSubmit} />
      </form>
    </BaseScreen>
  );
}

export default withStyles(styles)(EditCustomer);
