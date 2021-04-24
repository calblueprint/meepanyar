import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useSelector } from 'react-redux';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import OutlinedCardList, { CardPropsInfo } from '../../components/OutlinedCardList';
import { CustomerRecord, MeterReadingRecord, PaymentRecord } from '../../lib/airtable/interface';
import { selectCurrentCustomer, selectMeterReadingsByCustomerId, selectPaymentsByCustomerId } from '../../lib/redux/customerData';
import { EMPTY_CUSTOMER, MeterType } from '../../lib/redux/customerDataSlice';
import { RootState } from '../../lib/redux/store';
import { getAmountBilled, getCurrentReading, getPeriodUsage, getStartingReading, getTariffPlanByCustomer, isReadingFromLatestPeriod } from '../../lib/utils/customerUtils';
import Button from '../../components/Button';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    headerWrapper: {
      marginTop: '15px',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonPrimary: {
      borderRadius: '12px',
      color: 'white',
      marginRight: '5px',
      backgroundColor: theme.palette.primary.main,
    },
    meterInfoGrid: {
      display: 'flex',
    },
    meterInfoCol: {
      width: '50%',
      padding: '5px',
    },
  });

interface CustomerProps extends RouteComponentProps {
  classes: { content: string; headerWrapper: string; buttonPrimary: string; meterInfoGrid: string; meterInfoCol: string; };
  customer: CustomerRecord;
  location: any;
}

function CustomerProfile(props: CustomerProps) {
  const { classes, match } = props;
  const customer: CustomerRecord = useSelector(selectCurrentCustomer) || EMPTY_CUSTOMER;
  const meterReadings: MeterReadingRecord[] = useSelector((state: RootState) => selectMeterReadingsByCustomerId(state, customer.id)) || [];
  const payments: PaymentRecord[] = useSelector((state: RootState) => selectPaymentsByCustomerId(state, customer.id)) || [];

  if (customer === EMPTY_CUSTOMER) {
    return <Redirect to={'/customers'} />;
  }

  // data retrieval
  const UNDEFINED_AMOUNT = '--';

  const customerTariff = getTariffPlanByCustomer(customer);

  const fixedTariff = customerTariff ? customerTariff?.fixedTariff : UNDEFINED_AMOUNT;
  const unitTariff = customerTariff ? customerTariff?.tariffByUnit : UNDEFINED_AMOUNT;
  const freeUnits = customerTariff ? customerTariff?.freeUnits : UNDEFINED_AMOUNT;

  let tariffInfo: CardPropsInfo[] = [
    { number: fixedTariff.toString(), label: 'Fixed Tariff', unit: 'Ks' },
    { number: unitTariff.toString(), label: 'Unit Tariff', unit: 'Ks' },
    { number: freeUnits.toString(), label: 'Free Units', unit: 'kWh' },
  ]

  const currReading: MeterReadingRecord | undefined = getCurrentReading(customer);
  const startingReading : number = customer.startingMeterReading;
  const periodUsage: number = currReading ? getPeriodUsage(currReading, startingReading) : 0;
  const amountBilled: number = currReading ? getAmountBilled(currReading) : 0;

  const customerMeteredForPeriod = isReadingFromLatestPeriod(currReading);

  let meterInfo: CardPropsInfo[] = [
    { number: startingReading.toString(), label: 'Starting Meter', unit: 'kWh' },
    { number: periodUsage.toString(), label: 'Period Usage', unit: 'kWh' },
    { number: currReading ? currReading.reading.toString() : '0', label: 'Ending Meter', unit: 'kWh' },
    { number: amountBilled.toString(), label: 'Amount Billed', unit: 'kS' },
  ];
  let balanceInfo: CardPropsInfo[] = [{ number: customer.outstandingBalance.toString(), label: 'Remaining Balance', unit: 'kS' }];
  let readingInfo: CardPropsInfo[] = [{ number: currReading? currReading.reading.toString() : '0', label: 'Last Recorded Reading', unit: 'kWh' }];

  const getAddButton = (path: string) => {
    //TODO: separate into base component @wangannie
    return (
      <IconButton
        component={Link}
        to={{
          pathname: `${match.url}/${path}`,
          state: { invoices: meterReadings, payments: payments },
        }}
        size="small"
        className={classes.buttonPrimary}
      >
        <AddIcon />
      </IconButton>
    );
  };

  const getPaymentInfo = () => {
    if (customer.meterType === MeterType.INACTIVE) {
      balanceInfo = [{ number: UNDEFINED_AMOUNT, label: 'Remaining Balance', unit: '' }];
      return (
        <OutlinedCardList info={balanceInfo} readOnly />
      );
    } else {
      return (
        <OutlinedCardList info={balanceInfo} highlightedText rightIcon={getAddButton('payments/create')} />
      );
    }
  }

  const getReadingInfo = () => {
    let meterReadOnly = true;
    let topLeftReadOnly = true;

    if (customer.meterType === MeterType.ANALOG_METER) {
      meterReadOnly = false;
      topLeftReadOnly = false;
    } else if (customer.meterType === MeterType.NO_METER) {
      readingInfo = [{ number: UNDEFINED_AMOUNT, label: 'Last Recorded Reading', unit: '' }];
      meterInfo = [
        { number: UNDEFINED_AMOUNT, label: 'Starting Meter', unit: '' },
        { number: periodUsage.toString(), label: 'Period Usage', unit: 'kWh' },
        { number: UNDEFINED_AMOUNT, label: 'Ending Meter', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Amount Billed', unit: '' },
      ];
    } else if (customer.meterType === MeterType.INACTIVE) {
      readingInfo = [{ number: UNDEFINED_AMOUNT, label: 'Last Recorded Reading', unit: '' }];
      meterInfo = [
        { number: UNDEFINED_AMOUNT, label: 'Starting Meter', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Period Usage', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Ending Meter', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Amount Billed', unit: '' },
      ];
    }

    return (
      <div>
        <OutlinedCardList
          info={readingInfo}
          rightIcon={meterReadOnly ? undefined : (customerMeteredForPeriod ? <CheckCircleOutlineIcon /> : getAddButton('meter-readings/create'))}
          readOnly={meterReadOnly}
          editPath={!meterReadOnly && customerMeteredForPeriod ? `${match.url}/meter-readings/create` : undefined}
        />
        <div className={classes.meterInfoGrid}>
          <div className={classes.meterInfoCol}>
            { /* Top Left */ }
            <OutlinedCardList
              info={[meterInfo[0]]}
              readOnly={topLeftReadOnly}
              editPath={topLeftReadOnly ? undefined : `${match.url}/starting-meter-reading/edit`}
            />
            { /* Bottom Left */ }
            <OutlinedCardList
              info={[meterInfo[1]]}
              readOnly
            />
          </div>
          <div className={classes.meterInfoCol}>
            { /* Top Right */ }
            <OutlinedCardList
              info={[meterInfo[2]]}
              readOnly
            />
            { /* Bottom Right */ }
            <OutlinedCardList
              info={[meterInfo[3]]}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  }

  const getTariffInfo = () => {
    let tariffReadOnly;
    if (customer.meterType === MeterType.INACTIVE) {
      tariffInfo = [
        { number: UNDEFINED_AMOUNT, label: 'Fixed\nTariff', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Unit\nTariff', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Free\nUnits', unit: '' }
      ];
      tariffReadOnly = true;
    }
    return (
      <OutlinedCardList info={tariffInfo} columns readOnly={tariffReadOnly} reverse />
    );
  }

  return (
    <BaseScreen leftIcon="backNav" title={`${customer.customerNumber}, ${customer.name}`} rightIcon="edit" match={match}>
      <BaseScrollView>
        <div className={classes.content}>
          {getTariffInfo()}
          <div className={classes.headerWrapper}>
            <Typography variant="h2">Payment</Typography>
            <Link
              to={{
                pathname: `${match.url}/records`,
                state: { invoices: meterReadings, payments: payments, defaultTab: "1" }
              }}
            >
              <Button label={'View All'} variant="text" />
            </Link>
          </div>
          {getPaymentInfo()}
          <div className={classes.headerWrapper}>
            <Typography variant="h2">
              Meter Reading
            </Typography>
            <Link
              to={{
                pathname: `${match.url}/records`,
                state: { invoices: meterReadings, payments: payments, defaultTab: "0" }
              }}
            >
              <Button label={'View All'} variant="text" />
            </Link>
          </div>
          {getReadingInfo()}
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CustomerProfile);
