import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FlashOn as FlashOnIcon, AttachMoney as AttachMoneyIcon } from '@material-ui/icons';
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
      marginTop: '10px',
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
    { number: startingReading? startingReading.amountBilled.toString() : '0', label: 'Starting Meter', unit: 'kWh' },
    { number: periodUsage.toString(), label: 'Period Usage', unit: 'kWh' },
    { number: currReading ? currReading.toString() : '0', label: 'Ending Meter', unit: 'kWh' },
    { number: amountBilled.toString(), label: 'Amount Billed', unit: 'kS' },
  ];
  let balanceInfo: CardPropsInfo[] = [{ number: customer.outstandingBalance.toString(), label: 'Remaining Balance', unit: 'kS' }];
  let readingInfo: CardPropsInfo[] = [{ number: currReading? currReading.amountBilled.toString() : '0', label: 'Last Recorded Reading', unit: 'kWh' }];

  const getPaymentButton = () => {
    //TODO: change link to payments screen
    return (
      <div className={classes.buttonPrimary}>
        <IconButton
          component={Link}
          to={{
            pathname: `${match.url}/meter-readings/create`,
            state: { invoices: meterReadings, payments: payments },
          }}
          size="small"
        >
          <AttachMoneyIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
    );
  };

  const getAddButton = () => {
    return (
      <div className={classes.buttonPrimary}>
        <IconButton
          component={Link}
          to={{
            pathname: `${match.url}/meter-readings/create`,
            state: { invoices: meterReadings, payments: payments },
          }}
          size="small"
        >
          <FlashOnIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
    );
  };

  const getPaymentInfo = () => {
    if (customer.meterType === "Inactive") {
      balanceInfo = [{ number: UNDEFINED_AMOUNT, label: 'Remaining Balance', unit: '' }];
      return (
        <OutlinedCardList info={balanceInfo} primary={false} grayText={true} />
      );
    } else {
      return (
        <OutlinedCardList info={balanceInfo} primary={true} rightIcon={getPaymentButton()} />
      );
    }
  }

  const getReadingInfo = () => {
    if (customer.meterType === "Analog Meter") {
      return (
        <div>
          <OutlinedCardList info={readingInfo} primary={false} rightIcon={getAddButton()} />
          <div className={classes.section}>
            { /* Top Left */ }
            <MeterInfoContainer
              floatRight={false}
              info={meterInfo[0]}
              editable={true}
            />
            { /* Top Right */ }
            <MeterInfoContainer
              floatRight={true}
              info={meterInfo[2]}
            />
            { /* Bottom Right */ }
            <MeterInfoContainer
              floatRight={true}
              info={meterInfo[3]}
            />
            { /* Bottom Left */ }
            <MeterInfoContainer
              floatRight={false}
              info={meterInfo[1]}
            />
          </div>
        </div>
      );
    } else if (customer.meterType === "Smart Meter") {
      return (
        <div>
          <OutlinedCardList info={readingInfo} primary={false} grayBackground={true} />
          <div className={classes.section}>
            { /* Top Left */ }
            <MeterInfoContainer
              floatRight={false}
              info={meterInfo[0]}
            />
            { /* Top Right */ }
            <MeterInfoContainer
              floatRight={true}
              info={meterInfo[2]}
            />
            { /* Bottom Right */ }
            <MeterInfoContainer
              floatRight={true}
              info={meterInfo[3]}
            />
            { /* Bottom Left */ }
            <MeterInfoContainer
              floatRight={false}
              info={meterInfo[1]}
            />
          </div>
        </div>
      );
    } else if (customer.meterType === "No Meter") {
      readingInfo = [{ number: UNDEFINED_AMOUNT, label: 'Last Recorded Reading', unit: '' }];
      meterInfo = [
        { number: UNDEFINED_AMOUNT, label: 'Starting Meter', unit: '' },
        { number: periodUsage.toString(), label: 'Period Usage', unit: 'kWh' },
        { number: UNDEFINED_AMOUNT, label: 'Ending Meter', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Amount Billed', unit: '' },
      ];
      return (
        <div>
          <OutlinedCardList info={readingInfo} primary={false} />
          <div className={classes.section}>
            { /* Top Left */ }
            <MeterInfoContainer
              floatRight={false}
              info={meterInfo[0]}
              gray={true}
            />
            { /* Top Right */ }
            <MeterInfoContainer
              floatRight={true}
              info={meterInfo[2]}
              gray={true}
            />
            { /* Bottom Right */ }
            <MeterInfoContainer
              floatRight={true}
              info={meterInfo[3]}
              gray={true}
            />
            { /* Bottom Left */ }
            <MeterInfoContainer
              floatRight={false}
              info={meterInfo[1]}
            />
          </div>
        </div>
      );
    } else {
      readingInfo = [{ number: UNDEFINED_AMOUNT, label: 'Last Recorded Reading', unit: '' }];
      meterInfo = [
        { number: UNDEFINED_AMOUNT, label: 'Starting Meter', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Period Usage', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Ending Meter', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Amount Billed', unit: '' },
      ];
      return (
        <div>
          <OutlinedCardList info={readingInfo} primary={false} grayText={true} />
          <div className={classes.section}>
            { /* Top Left */ }
            <MeterInfoContainer
              floatRight={false}
              info={meterInfo[0]}
              gray={true}
            />
            { /* Top Right */ }
            <MeterInfoContainer
              floatRight={true}
              info={meterInfo[2]}
              gray={true}
            />
            { /* Bottom Right */ }
            <MeterInfoContainer
              floatRight={true}
              info={meterInfo[3]}
              gray={true}
            />
            { /* Bottom Left */ }
            <MeterInfoContainer
              floatRight={false}
              info={meterInfo[1]}
              gray={true}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <BaseScreen leftIcon="backNav" title={customer.name} rightIcon="edit" match={match}>
      <BaseScrollView>
        <div className={classes.content}>
          <Typography variant="h2">{currentSite.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {customer.meterNumber}
          </Typography>
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
