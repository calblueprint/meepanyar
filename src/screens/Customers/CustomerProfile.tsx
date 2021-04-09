import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Add as AddIcon } from '@material-ui/icons';
import { connect, useSelector } from 'react-redux';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import OutlinedCardList, { CardPropsInfo } from '../../components/OutlinedCardList';
import { CustomerRecord, MeterReadingRecord, SiteRecord, PaymentRecord } from '../../lib/airtable/interface';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { RootState } from '../../lib/redux/store';
import { getAmountBilled, getCurrentReading, getPeriodUsage, getStartingReading, getTariffPlan } from '../../lib/utils/customerUtils';
import { selectCurrentCustomer, selectMeterReadingsByCustomerId, selectPaymentsByCustomerId } from '../../lib/redux/customerData';
import { EMPTY_CUSTOMER } from '../../lib/redux/customerDataSlice';
import TariffPlanInfo from './components/TariffPlanInfo';
import MeterInfoContainer from './components/MeterInfoContainer';

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
    buttonSecondary: {
      color: theme.palette.primary.main,
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.10em',
      '&:hover': {
        textDecoration: 'none',
        color: theme.palette.primary.main,
      },
    },
    section: {
      marginTop: '12px',
    },
  });

interface CustomerProps extends RouteComponentProps {
  classes: { content: string; headerWrapper: string; buttonPrimary: string; buttonSecondary: string; section: string; };
  currentSite: SiteRecord;
  customer: CustomerRecord;
  location: any;
}

function CustomerProfile(props: CustomerProps) {
  const { classes, match, currentSite } = props;
  const customer: CustomerRecord = useSelector(selectCurrentCustomer) || EMPTY_CUSTOMER;
  const meterReadings: MeterReadingRecord[] = useSelector((state: RootState) => selectMeterReadingsByCustomerId(state, customer.id)) || [];
  const payments: PaymentRecord[] = useSelector((state: RootState) => selectPaymentsByCustomerId(state, customer.id)) || [];

  if (customer === EMPTY_CUSTOMER) {
    return <Redirect to={'/customers'} />;
  }

  // data retrieval
  const UNDEFINED_AMOUNT = '--';

  const customerTariff = getTariffPlan(customer, currentSite);

  const fixedTariff = customerTariff ? customerTariff?.fixedTariff : UNDEFINED_AMOUNT;
  const unitTariff = customerTariff ? customerTariff?.tariffByUnit : UNDEFINED_AMOUNT;
  const freeUnits = customerTariff ? customerTariff?.freeUnits : UNDEFINED_AMOUNT;

  const tariffInfo: CardPropsInfo[] = [
    { number: fixedTariff.toString(), label: 'Fixed Tariff', unit: 'MMK' },
    { number: unitTariff.toString(), label: 'Unit Tariff', unit: 'MMK' },
    { number: freeUnits.toString(), label: 'Free Units', unit: '' },
  ]

  const currReading: MeterReadingRecord | undefined = getCurrentReading(customer);
  const startingReading: MeterReadingRecord | undefined = getStartingReading(customer);
  const periodUsage: number | string = currReading ? getPeriodUsage(currReading, startingReading) : '0';
  const amountBilled: number | string = currReading ? getAmountBilled(currReading) : '0';

  let meterInfo: CardPropsInfo[] = [
    //TODO: include actual starting reading - currentCustomer.startingMeterReading
    { number: startingReading? startingReading.amountBilled.toString() : '0', label: 'Starting Meter', unit: 'kWh' },
    { number: periodUsage.toString(), label: 'Period Usage', unit: 'kWh' },
    { number: currReading ? currReading.reading.toString() : '0', label: 'Ending Meter', unit: 'kWh' },
    { number: amountBilled.toString(), label: 'Amount Billed', unit: 'kS' },
  ];
  let balanceInfo: CardPropsInfo[] = [{ number: customer.outstandingBalance.toString(), label: 'Remaining Balance', unit: 'kS' }];
  let readingInfo: CardPropsInfo[] = [{ number: currReading? currReading.reading.toString() : '0', label: 'Last Recorded Reading', unit: 'kWh' }];

  const getAddButton = (path: String) => {
    return (
      <div className={classes.buttonPrimary}>
        <IconButton
          component={Link}
          to={{
            pathname: `${match.url}${path}`,
            state: { invoices: meterReadings, payments: payments },
          }}
          size="small"
        >
          <AddIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
    );
  };

  const getPaymentInfo = () => {
    if (customer.meterType === "Inactive") {
      balanceInfo = [{ number: UNDEFINED_AMOUNT, label: 'Remaining Balance', unit: '' }];
      return (
        <OutlinedCardList info={balanceInfo} primary={false} grayBackground={true} grayText={true} />
      );
    } else {
      return (
        <OutlinedCardList info={balanceInfo} primary={true} rightIcon={getAddButton('/meter-readings/create')} />
      );
    }
  }

  const getReadingInfo = () => {
    //0 has rightIcon, 1 has grayBackground, 2 has grayText + grayBackground
    let readingCardState;
    let topLeftEditable;
    let topLeftGray, topRightGray, bottomRightGray, bottomLeftGray;

    if (customer.meterType === "Analog Meter") {
      readingCardState = 0;
      topLeftEditable = true;
    } else if (customer.meterType === "Smart Meter") {
      readingCardState = 1;
    } else if (customer.meterType === "No Meter") {
      readingCardState = 2;
      topLeftGray = true;
      topRightGray = true;
      bottomRightGray = true;
      readingInfo = [{ number: UNDEFINED_AMOUNT, label: 'Last Recorded Reading', unit: '' }];
      meterInfo = [
        { number: UNDEFINED_AMOUNT, label: 'Starting Meter', unit: '' },
        { number: periodUsage.toString(), label: 'Period Usage', unit: 'kWh' },
        { number: UNDEFINED_AMOUNT, label: 'Ending Meter', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Amount Billed', unit: '' },
      ];
    } else {
      readingCardState = 2;
      topLeftGray = true;
      topRightGray = true;
      bottomRightGray = true;
      bottomLeftGray = true;
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
          primary={false}
          rightIcon={readingCardState === 0 ? getAddButton('/meter-readings/create') : undefined}
          grayBackground={readingCardState === 1 || readingCardState === 2 ? true : undefined} grayText={readingCardState === 2 ? true : undefined}
        />
        <div className={classes.section}>
          { /* Top Left */ }
          <MeterInfoContainer
            floatRight={false}
            info={meterInfo[0]}
            editable={topLeftEditable}
            gray={topLeftGray}
          />
          { /* Top Right */ }
          <MeterInfoContainer
            floatRight={true}
            info={meterInfo[2]}
            gray={topRightGray}
          />
          { /* Bottom Right */ }
          <MeterInfoContainer
            floatRight={true}
            info={meterInfo[3]}
            gray={bottomRightGray}
          />
          { /* Bottom Left */ }
          <MeterInfoContainer
            floatRight={false}
            info={meterInfo[1]}
            gray={bottomLeftGray}
          />
        </div>
      </div>
    );
  }

  return (
    <BaseScreen leftIcon="backNav" title={`${customer.meterNumber}, ${customer.name}`} rightIcon="edit" match={match}>
      <BaseScrollView>
        <div className={classes.content}>
          <TariffPlanInfo
            undefinedAmount={UNDEFINED_AMOUNT}
            meterType={customer.meterType}
            fixedTariff={fixedTariff.toString()}
            unitTariff={unitTariff.toString()}
            freeUnits={freeUnits.toString()}
          />
          <div className={classes.headerWrapper}>
            <Typography variant="h2">Payment</Typography>
            <Link className={classes.buttonSecondary}
              to={{
              pathname: `${match.url}/records`,
              state: { invoices: meterReadings, payments: payments, defaultTab: '1' },
            }}>View All</Link>
          </div>
          {getPaymentInfo()}
          <div className={classes.headerWrapper}>
            <Typography variant="h2">
              Meter Reading
            </Typography>
            <Link className={classes.buttonSecondary}
              to={{
              pathname: `${match.url}/records`,
              state: { invoices: meterReadings, payments: payments, defaultTab: '0' },
            }}>View All</Link>
          </div>
          {getReadingInfo()}
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite || EMPTY_SITE,
});

export default connect(mapStateToProps)(withStyles(styles)(CustomerProfile));
