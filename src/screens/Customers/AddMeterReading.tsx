import { Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { RouteComponentProps, Redirect, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { CustomerRecord, MeterReadingRecord, SiteRecord } from '../../lib/airtable/interface';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import { EMPTY_METER_READING } from '../../lib/redux/customerDataSlice';
import moment from 'moment';
import { RootState } from '../../lib/redux/store';
import { selectCurrentUserId } from '../../lib/redux/userData';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { getTariffPlan, calculateAmountBilled, getStartingReading } from '../../lib/utils/customerUtils';
import { createMeterReadingAndUpdateCustomerBalance } from '../../lib/airtable/request';
import { formatDateStringToLocal } from '../../lib/moment/momentUtils';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    outlined: {
      padding: '15px 15px 10px',
      border: `1px solid ${theme.palette.text.secondary}`,
      borderRadius: '6px',
      marginTop: '10px',
    },
    secondaryText: {
      color: theme.palette.text.secondary,
    },
  });

interface AddMeterReadingProps extends RouteComponentProps {
  classes: { content: string; outlined: string; secondaryText: string };
  currentSite: SiteRecord;
  location: any;
}

function AddMeterReading(props: AddMeterReadingProps) {
  const { classes, currentSite } = props;
  const history = useHistory();
  const currentCustomer: CustomerRecord | undefined = useSelector(selectCurrentCustomer);
  const userId = useSelector(selectCurrentUserId);
  const [meterReadingAmount, setMeterReadingAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!currentCustomer || !userId) {
    return <Redirect to={'/customers'} />
  }

  const tariffPlan = getTariffPlan(currentCustomer, currentSite);

  if (!tariffPlan) {
    console.log("(Meter Readings) Could not find customer tariff plan, redirecting to Customer Main")
    return <Redirect to={'/customers'} />
  }

  let startingMeterReading: MeterReadingRecord = getStartingReading(currentCustomer) || EMPTY_METER_READING;

  const handleSetMeterReadingAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMeterReadingAmount(parseFloat(event.target.value as string) || 0);
  }

  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();
    setLoading(true);

    const meterReading = JSON.parse(JSON.stringify(EMPTY_METER_READING));
    meterReading.reading = meterReadingAmount;
    meterReading.amountBilled = calculateAmountBilled(meterReadingAmount - startingMeterReading.reading, tariffPlan);
    meterReading.date = moment().toISOString();
    meterReading.customerId = currentCustomer.id;
    meterReading.billedById = userId;
    meterReading.meterNumber = currentCustomer.meterNumber;

    createMeterReadingAndUpdateCustomerBalance(meterReading, currentCustomer).then(history.goBack);
  }

  return (
    <BaseScreen title="Add Meter Reading" leftIcon="backNav">
      <div className={classes.content}>
        <form noValidate>
          <div className={classes.secondaryText}>
            <Typography variant="body1">Date Recorded</Typography>
            <Typography variant="body1">{startingMeterReading.date ? formatDateStringToLocal(startingMeterReading.date) : '-'}</Typography>
            <Typography variant="body1" style={{ marginTop: 10 }}>
              Current Reading
            </Typography>
            <Typography variant="h2" style={{ fontSize: 22 }}>
              {startingMeterReading.reading}
            </Typography>
          </div>
          <div className={classes.outlined}>
            <Typography variant="body1" style={{ marginBottom: 0 }}>
              Today
            </Typography>
            <Typography variant="body1" style={{ marginBottom: 15 }}>
              {formatDateStringToLocal(moment().toISOString())}
            </Typography>
            <TextField label={'New Meter Reading (kWh)'} id={'new-meter-reading'} onChange={handleSetMeterReadingAmount} />
          </div>
          <Button label={'ADD'} loading={loading} onClick={handleSubmit} />
        </form>
      </div>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite || EMPTY_SITE as SiteRecord
})

export default connect(mapStateToProps)(withStyles(styles)(AddMeterReading));
