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
            margin: '20px 0px'
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
    console.log("(Meter Readings) Could not find customer tariff plan, redirecting to Customer Main")
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
    setLoading(true);

    const currentReadingAmount = parseFloat(meterReadingAmount);
    if (isNaN(currentReadingAmount)) {
      setErrorMessage('Meter Reading Amount must be a number');
      return;
    } else {
      setLoading(true);
    }

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
    unit: 'Kwh', 
    secondaryLabel: formatDateStringToLocal(currentCustomer.startingMeterLastChanged) 
  }]

  return (
      <BaseScreen title="Add Payment" leftIcon="backNav">
          <div className={classes.amountOwedContainer}>
              <OutlinedCardList info={cardInfo} />
          </div>
          <TextField label='New Meter Reading (kWh)' unit='kWh' id={'amount-paid'} placeholder='e.g. 12' type='number' onChange={handleSetMeterReadingAmount} />
          <Button label={'ADD'} onClick={handleSubmit} loading={loading} />
          {errorMessage && <Typography color='error' align='center'> {errorMessage} </Typography> }
      </BaseScreen>
  );
}

export default withStyles(styles)(AddMeterReading);
