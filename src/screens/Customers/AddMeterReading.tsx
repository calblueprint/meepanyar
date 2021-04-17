import { Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, Redirect, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { CustomerRecord } from '../../lib/airtable/interface';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import { EMPTY_METER_READING } from '../../lib/redux/customerDataSlice';
import moment from 'moment';
import { selectCurrentUserId } from '../../lib/redux/userData';
import { getTariffPlanByCustomer, calculateAmountBilled } from '../../lib/utils/customerUtils';
import { createMeterReadingAndUpdateCustomerBalance } from '../../lib/airtable/request';
import OutlinedCardList from '../../components/OutlinedCardList';
import { formatDateStringToLocal } from '../../lib/moment/momentUtils';


const styles = (theme: Theme) =>
  createStyles({
    amountOwedContainer: {
      margin: theme.spacing(3, 0)
    },
  });

interface AddMeterReadingProps extends RouteComponentProps {
  classes: { amountOwedContainer: string; };
}

function AddMeterReading(props: AddMeterReadingProps) {
  const { classes } = props;
  const history = useHistory();
  const currentCustomer: CustomerRecord | undefined = useSelector(selectCurrentCustomer);
  const userId = useSelector(selectCurrentUserId);
  const [meterReadingAmount, setMeterReadingAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!currentCustomer || !userId) {
    return <Redirect to={'/customers'} />
  }

  const tariffPlan = getTariffPlanByCustomer(currentCustomer);

  if (!tariffPlan) {
    return <Redirect to={'/customers'} />
  }

  const startingMeterAmount = currentCustomer.startingMeterReading;
  const startingMeterLastRecorded = currentCustomer.startingMeterLastChanged;


  const handleSetMeterReadingAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMeterReadingAmount(event.target.value as string);
  }

  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();

    const currentReadingAmount = parseFloat(meterReadingAmount);
    if (isNaN(currentReadingAmount)) {
      setErrorMessage('Meter Reading Amount must be a number');
      return;
    } else {
      setLoading(true);
    }

    // WARNING: Client-side Amount Billed is treated as a source of truth in order to 
    // accomodate for offline functionality when a user adjusts a Customer's startingMeterAmount when offline
    const meterReading = JSON.parse(JSON.stringify(EMPTY_METER_READING));
    meterReading.reading = currentReadingAmount;
    meterReading.amountBilled = calculateAmountBilled(currentReadingAmount - startingMeterAmount, tariffPlan);
    meterReading.date = moment().toISOString();
    meterReading.customerId = currentCustomer.id;
    meterReading.billedById = userId;
    meterReading.meterNumber = currentCustomer.meterNumber;

    createMeterReadingAndUpdateCustomerBalance(meterReading, currentCustomer).then(history.goBack);
  }

  const cardInfo = [{
    number: startingMeterAmount.toString(),
    label: 'Current Reading',
    unit: 'kWh',
    secondaryLabel: formatDateStringToLocal(startingMeterLastRecorded)
  }]

  return (
    <BaseScreen title="Add Meter Reading" leftIcon="backNav">
      <div className={classes.amountOwedContainer}>
        <OutlinedCardList info={cardInfo} />
      </div>
      <TextField
        label='New Meter Reading (kWh)'
        unit='kWh'
        id={'amount-metered'}
        placeholder='e.g. 100'
        type='number'
        onChange={handleSetMeterReadingAmount}
        required
        value={meterReadingAmount}
      />
      <Button label={'Add'} onClick={handleSubmit} loading={loading} errorMessage={errorMessage} />
    </BaseScreen>
  );
}

export default withStyles(styles)(AddMeterReading);
