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
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { roundToString } from '../../lib/utils/utils';

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
  const intl = useInternationalization();
  const { classes } = props;
  const history = useHistory();
  const currentCustomer: CustomerRecord | undefined = useSelector(selectCurrentCustomer);
  const userId = useSelector(selectCurrentUserId);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    meterReadingAmount:
      yup.number()
        .min(currentCustomer?.startingMeterReading || 0, intl(words.new_reading_must_be_larger_than_previous_reading))
        .required(intl(words.please_enter_a_x, words.positive_number))
  });

  const formik = useFormik({
    initialValues: {
      meterReadingAmount: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  })

  if (!currentCustomer || !userId) {
    return <Redirect to={'/customers'} />
  }

  const tariffPlan = getTariffPlanByCustomer(currentCustomer);

  if (!tariffPlan) {
    return <Redirect to={'/customers'} />
  }

  const startingMeterAmount = currentCustomer.startingMeterReading;
  const startingMeterLastRecorded = currentCustomer.startingMeterLastChanged;

  const handleSubmit = (values: any) => {
    const { meterReadingAmount } = values
    setLoading(true);

    const currentReadingAmount = parseFloat(meterReadingAmount);

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
    number: roundToString(startingMeterAmount),
    label: intl(words.starting_meter),
    unit: intl(words.kwh),
    secondaryLabel: formatDateStringToLocal(startingMeterLastRecorded)
  }]

  return (
    <BaseScreen title={intl(words.add_x, words.meter_reading)} leftIcon="backNav">
      <div className={classes.amountOwedContainer}>
        <OutlinedCardList info={cardInfo} />
      </div>
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          label={intl(words.new_meter_reading)}
          unit={intl(words.kwh)}
          id={'meterReadingAmount'}
          placeholder={intl(words.eg_x, '100')}
          type='number'
          onChange={formik.handleChange}
          required
          value={formik.values.meterReadingAmount}
          error={formik.touched.meterReadingAmount && Boolean(formik.errors.meterReadingAmount)}
          helperText={formik.touched.meterReadingAmount && formik.errors.meterReadingAmount}
        />
        <Button label={intl(words.add)} loading={loading} fullWidth />
      </form>
    </BaseScreen>
  );
}

export default withStyles(styles)(AddMeterReading);
