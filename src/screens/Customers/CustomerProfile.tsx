import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import OfflineDialog from '../../components/OfflineDialog';
import OutlinedCardList, { CardPropsInfo } from '../../components/OutlinedCardList';
import Snackbar from '../../components/Snackbar';
import { CustomerRecord, MeterReadingRecord, PaymentRecord } from '../../lib/airtable/interface';
import { selectCurrentCustomer, selectMeterReadingsByCustomerId, selectPaymentsByCustomerId } from '../../lib/redux/customerData';
import { EMPTY_CUSTOMER, MeterType } from '../../lib/redux/customerDataSlice';
import { RootState } from '../../lib/redux/store';
import { selectIsOnline } from '../../lib/redux/userData';
import { getAmountBilled, getCurrentReading, getPeriodUsage, getTariffPlanByCustomer, isReadingFromLatestPeriod } from '../../lib/utils/customerUtils';
import { isOfflineId } from '../../lib/utils/offlineUtils';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

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
    leftMeterInfoCol: {
      width: '50%',
      padding: '5px 5px 5px 0px',
    },
    rightMeterInfoCol: {
      width: '50%',
      padding: '5px 0px 5px 5px',
    },
  });

interface CustomerProps extends RouteComponentProps {
  classes: { content: string; headerWrapper: string; buttonPrimary: string; meterInfoGrid: string; leftMeterInfoCol: string; rightMeterInfoCol: string; };
  customer: CustomerRecord;
  location: any;
}

function CustomerProfile(props: CustomerProps) {
  const intl = useInternationalization();
  const { classes, match } = props;
  const customer: CustomerRecord = useSelector(selectCurrentCustomer) || EMPTY_CUSTOMER;
  const meterReadings: MeterReadingRecord[] = useSelector((state: RootState) => selectMeterReadingsByCustomerId(state, customer.id)) || [];
  const payments: PaymentRecord[] = useSelector((state: RootState) => selectPaymentsByCustomerId(state, customer.id)) || [];
  const history = useHistory();
  const isOnline = useSelector(selectIsOnline);

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
    { number: fixedTariff.toString(), label: words.fixed_tariff, unit: words.ks },
    { number: unitTariff.toString(), label: words.per_unit_tariff, unit: words.ks },
    { number: freeUnits.toString(), label: words.free_units, unit: words.kwh },
  ]

  const currReading: MeterReadingRecord | undefined = getCurrentReading(customer);
  const startingReading: number = customer.startingMeterReading;
  const periodUsage: number = currReading ? getPeriodUsage(currReading, startingReading) : 0;
  const amountBilled: number = currReading ? getAmountBilled(currReading) : 0;

  const customerMeteredForPeriod = isReadingFromLatestPeriod(currReading);

  let meterInfo: CardPropsInfo[] = [
    { number: startingReading.toString(), label: words.starting_meter, unit: words.kwh },
    { number: periodUsage.toString(), label: words.period_usage, unit: words.kwh },
    { number: currReading ? currReading.reading.toString() : '0', label: words.ending_meter, unit: words.kwh },
    { number: amountBilled.toString(), label: words.amount_billed, unit: words.ks },
  ];
  let balanceInfo: CardPropsInfo[] = [{ number: customer.outstandingBalance.toString(), label: 'Remaining Balance', unit: 'kS' }];
  let readingInfo: CardPropsInfo[] = [{ number: currReading ? currReading.reading.toString() : '0', label: 'Last Recorded Reading', unit: 'kWh' }];

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
    if (!customer.isactive) {
      balanceInfo = [{ number: UNDEFINED_AMOUNT, label: intl(words.remaining_balance), unit: '' }];
      return (
        <OutlinedCardList info={balanceInfo} readOnly />
      );
    } else {
      return (
        <OutlinedCardList info={balanceInfo} highlighted rightIcon={getAddButton('payments/create')} />
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
      readingInfo = [{ number: UNDEFINED_AMOUNT, label: intl(words.last_recorded_reading), unit: '' }];
      meterInfo = [
        { number: UNDEFINED_AMOUNT, label: intl(words.starting_meter), unit: '' },
        { number: periodUsage.toString(), label: intl(words.period_usage), unit: words.kwh },
        { number: UNDEFINED_AMOUNT, label: intl(words.ending_meter), unit: '' },
        { number: UNDEFINED_AMOUNT, label: intl(words.amount_billed), unit: '' },
      ];
    } else if (!customer.isactive) {
      readingInfo = [{ number: UNDEFINED_AMOUNT, label: intl(words.last_recorded_reading), unit: '' }];
      meterInfo = [
        { number: UNDEFINED_AMOUNT, label: intl(words.starting_meter), unit: '' },
        { number: UNDEFINED_AMOUNT, label: intl(words.period_usage), unit: '' },
        { number: UNDEFINED_AMOUNT, label: intl(words.ending_meter), unit: '' },
        { number: UNDEFINED_AMOUNT, label: intl(words.amount_billed), unit: '' },
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
          <div className={classes.leftMeterInfoCol}>
            { /* Top Left */}
            <OutlinedCardList
              info={[meterInfo[0]]}
              readOnly={topLeftReadOnly}
              editPath={topLeftReadOnly ? undefined : `${match.url}/starting-meter-reading/edit`}
            />
            { /* Bottom Left */}
            <OutlinedCardList
              info={[meterInfo[1]]}
              readOnly
            />
          </div>
          <div className={classes.rightMeterInfoCol}>
            { /* Top Right */}
            <OutlinedCardList
              info={[meterInfo[2]]}
              readOnly
            />
            { /* Bottom Right */}
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
    if (!customer.isactive) {
      tariffInfo = [
        { number: UNDEFINED_AMOUNT, label: intl(words.fixed_tariff), unit: '' },
        { number: UNDEFINED_AMOUNT, label: intl(words.per_unit_tariff), unit: '' },
        { number: UNDEFINED_AMOUNT, label: intl(words.free_units), unit: '' }
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
            <Typography variant="h2">{intl(words.payment)}</Typography>
            <Link
              to={{
                pathname: `${match.url}/records`,
                state: { invoices: meterReadings, payments: payments, defaultTab: "1" }
              }}
            >
              <Button label={intl(words.view_all)} variant="text" />
            </Link>
          </div>
          {getPaymentInfo()}
          <div className={classes.headerWrapper}>
            <Typography variant="h2">
              {intl(words.current_meter_reading_kwh)}
            </Typography>
            <Link
              to={{
                pathname: `${match.url}/records`,
                state: { invoices: meterReadings, payments: payments, defaultTab: "0" }
              }}
            >
              <Button label={intl(words.view_all)} variant="text" />
            </Link>
          </div>
          {getReadingInfo()}
        </div>
      </BaseScrollView>
      {/* Show the snackbar whenever the user is offline regardless of what actions they took, if any. */}
      {/* Exception: don't show the snackbar if showing OfflineDialog */}
      <Snackbar
        open={!isOfflineId(customer.id) && !isOnline}
        message="You are not connected to a network. Customer updates will be recorded after you reconnect."
      />
      <OfflineDialog
        open={isOfflineId(customer.id)}
        closeAction={history.goBack}
        headingText="New Customer Data Offline"
        bodyText="Customer information cannot be edited until information has been uploaded. Connect to a network to add data."
      />
    </BaseScreen>
  );
}

export default withStyles(styles)(CustomerProfile);
