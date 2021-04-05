import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
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

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    section: {
      marginTop: '30px',
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
      borderRadius: '12px',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
  });

interface CustomerProps extends RouteComponentProps {
  classes: { content: string; section: string; headerWrapper: string; buttonPrimary: string; buttonSecondary: string; };
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
  const UNDEFINED_AMOUNT = '-';

  const customerTariff = getTariffPlan(customer, currentSite);

  const fixedTariff = customerTariff ? customerTariff?.fixedTariff : UNDEFINED_AMOUNT;
  const unitTariff = customerTariff ? customerTariff?.tariffByUnit : UNDEFINED_AMOUNT;
  const minUnits = customerTariff ? customerTariff?.minUnits : UNDEFINED_AMOUNT;

  const tariffInfo: CardPropsInfo[] = [
    { number: fixedTariff.toString(), label: 'Fixed Tariff', unit: 'MMK' },
    { number: unitTariff.toString(), label: 'Unit Tariff', unit: 'MMK' },
    { number: minUnits.toString(), label: 'Minimum Units Used', unit: '' },
  ]

  const currReading: MeterReadingRecord | undefined = getCurrentReading(customer);
  const startingReading: MeterReadingRecord | undefined = getStartingReading(customer);
  const periodUsage: number | string = currReading ? getPeriodUsage(currReading, startingReading) : UNDEFINED_AMOUNT;
  const amountBilled: number | string = currReading ? getAmountBilled(currReading) : UNDEFINED_AMOUNT;

  const meterInfo: CardPropsInfo[] = [
    { number: startingReading ? startingReading.amountBilled.toString() : UNDEFINED_AMOUNT, label: 'Starting Meter', unit: 'kWh' },
    { number: periodUsage.toString(), label: 'Period Usage', unit: 'kWh' },
    { number: amountBilled.toString(), label: 'Amount Billed', unit: 'kS' },
  ];
  const balanceInfo: CardPropsInfo[] = [{ number: customer.outstandingBalance.toString(), label: 'Remaining Balance', unit: 'kS' }];
  const readingInfo: CardPropsInfo[] = [{ number: currReading ? currReading.amountBilled.toString() : UNDEFINED_AMOUNT, label: 'Current Reading', unit: 'kWh' }];

  const getPaymentButton = () => {
    return (
      <Button
        variant="contained"
        component={Link}
        to={`${match.url}/payments/create`}
        className={classes.buttonPrimary}
        startIcon={<AddIcon />}
        disableElevation={true}
      >
        Add Payment
      </Button>
    );
  };


  const getRecordsButton = () => {
    return (
      <Button
        variant="contained"
        component={Link}
        to={{
          pathname: `${match.url}/records`,
          state: { invoices: meterReadings, payments: payments },
        }}
        className={classes.buttonSecondary}
        startIcon={<ListAltOutlinedIcon />}
        disableElevation={true}
      >
        Records
      </Button>
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
          <AddIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
    );
  };

  return (
    <BaseScreen leftIcon="backNav" title={customer.name} rightIcon="edit" match={match}>
      <BaseScrollView>
        <div className={classes.content}>
          <Typography variant="h1">{currentSite.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {customer.meterNumber}
          </Typography>
          <OutlinedCardList info={tariffInfo} primary={false} columns />
          <div className={classes.section}>
            <div className={classes.headerWrapper}>
              <Typography variant="h2">Payment</Typography>
              {getRecordsButton()}
            </div>
            <OutlinedCardList info={balanceInfo} primary={true} rightIcon={getPaymentButton()} />
          </div>
          <div className={classes.section}>
            <Typography variant="h2">
              Meter Reading
            </Typography>
            <OutlinedCardList info={readingInfo} primary={true} rightIcon={getAddButton()} />
            <OutlinedCardList info={meterInfo} primary={false} />
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite || EMPTY_SITE,
});

export default connect(mapStateToProps)(withStyles(styles)(CustomerProfile));
