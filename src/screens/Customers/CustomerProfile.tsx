import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ListAltOutlined as ListAltOutlinedIcon, FlashOn as FlashOnIcon, AttachMoney as AttachMoneyIcon, Create as CreateIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import OutlinedCardList, { CardPropsInfo } from '../../components/OutlinedCardList';
import { CustomerRecord, MeterReadingRecord, SiteRecord } from '../../lib/airtable/interface';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { EMPTY_CUSTOMER } from '../../lib/redux/customerDataSlice';
import { RootState } from '../../lib/redux/store';
import { getAmountBilled, getCurrentReading, getPeriodUsage, getStartingReading, getTariffPlan } from '../../lib/utils/customerUtils';
import { getCurrentCustomer } from '../../lib/redux/customerData';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    section: {
      marginTop: '10px',
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
      }
    },
    infoContainer: {
      marginTop: '10px',
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: '6px',
    },
    tariffInfo: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',
    },
    tariffInfoItem: {
      width: '100%',
      color: theme.palette.text.primary,
    },
    tariffInfoLabel: {
      whiteSpace: 'pre-line',
      lineHeight: '1.2',
      marginTop: '5px',
    },
    meterInfoContainer: {
      width: '50%',
    },
    meterInfo: {
      marginBottom: '8px',
      padding: '8px 12px',
      border: '1px solid',
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.divider,
      borderRadius: '6px',
    },
    editableMeterIcon: {
      fontSize: '16px',
      marginLeft: '5px',
      marginTop: '-4px',
      color: theme.palette.primary.main,
    },
    gray: {
      color: 'rgba(189,189,189,1)',
    },
  });

interface CustomerProps extends RouteComponentProps {
  classes: { content: string; section: string; headerWrapper: string; buttonPrimary: string; buttonSecondary: string; infoContainer: string; tariffInfo: string; tariffInfoItem: string; tariffInfoLabel: string; meterInfoContainer: string; meterInfo: string; editableMeterIcon: string; gray: string; };
  currentSite: SiteRecord;
  customer: CustomerRecord;
  location: any;
}

function CustomerProfile(props: CustomerProps) {
  const { classes, match, currentSite, customer } = props;

  // data retrieval
  const UNDEFINED_AMOUNT = '--';

  const customerTariff = getTariffPlan(customer, currentSite);
  const fixedTariff = customerTariff ? customerTariff?.fixedTariff : UNDEFINED_AMOUNT;
  const unitTariff = customerTariff ? customerTariff?.tariffByUnit : UNDEFINED_AMOUNT;
  const minUnits = customerTariff ? customerTariff?.minUnits : UNDEFINED_AMOUNT;
  let tariffInfo : CardPropsInfo[] = [
    { number: fixedTariff.toString() , label: 'Fixed\nTariff', unit: 'Ks' },
    { number: unitTariff.toString(), label: 'Unit\nTariff', unit: 'Ks' },
    { number: minUnits.toString(), label: 'Minimum\nUnits', unit: 'kWh' },
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
            state: { invoices: customer.meterReadings, payments: customer.payments },
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
            state: { invoices: customer.meterReadings, payments: customer.payments },
          }}
          size="small"
        >
          <FlashOnIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
    );
  };

  const getTariffInfo = () => {
    customer.meterType = "Inactive";
    if (customer.meterType == "Inactive") {
      tariffInfo = [
        { number: UNDEFINED_AMOUNT , label: 'Fixed\nTariff', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Unit\nTariff', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Minimum\nUnits', unit: '' },
      ]
      return (
        <div className={classes.tariffInfo}>
          {tariffInfo.map((info, index) => (
            <div key={index} className={classes.tariffInfoItem}>
              <Typography variant="h3" align={'center'} className={classes.gray}>
                {info.number} {info.unit}
              </Typography>
              <Typography variant="body1" align={'center'} className={classes.tariffInfoLabel}>{info.label}</Typography>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className={classes.tariffInfo}>
          {tariffInfo.map((info, index) => (
            <div key={index} className={classes.tariffInfoItem}>
              <Typography variant="h3" align={'center'}>
                {info.number} {info.unit}
              </Typography>
              <Typography variant="body1" align={'center'} className={classes.tariffInfoLabel}>{info.label}</Typography>
            </div>
          ))}
        </div>
      );
    }
  }

  const getPaymentInfo = () => {
    if (customer.meterType == "Inactive") {
      balanceInfo = [{ number: UNDEFINED_AMOUNT, label: 'Remaining Balance', unit: '' }];
      return (
        <OutlinedCardList info={balanceInfo} primary={false} textColor={'rgba(189,189,189,1)'} />
      );
    } else {
      return (
        <OutlinedCardList info={balanceInfo} primary={true} rightIcon={getPaymentButton()} />
      );
    }
  }

  const getReadingInfo = () => {
    if (customer.meterType == "Analog Meter") {
      return (
        <div>
          <OutlinedCardList info={readingInfo} primary={false} />
          <div className={classes.section}>
            { /* Top Left */ }
            <div style={{ float: 'left' }} className={classes.meterInfoContainer}>
              <div style={{ marginRight: '4px', backgroundColor: 'white' }} className={classes.meterInfo}>
                <div style={{ display: 'inline-flex' }}>
                  <Typography variant="body1">{meterInfo[0].label}</Typography>
                  <IconButton size="small">
                    {/* TODO: add link to this button */}
                    <CreateIcon className={classes.editableMeterIcon} />
                  </IconButton>
                </div>
                <Typography variant="h3">
                  {meterInfo[0].number} {meterInfo[0].unit}
                </Typography>
              </div>
            </div>
            { /* Top Right */ }
            <div style={{ float: 'left' }} className={classes.meterInfoContainer}>
              <div style={{ marginLeft: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[2].label}</Typography>
                <Typography variant="h3">
                  {meterInfo[2].number} {meterInfo[2].unit}
                </Typography>
              </div>
            </div>
            { /* Bottom Right */ }
            <div style={{ float: 'right' }} className={classes.meterInfoContainer}>
              <div style={{ marginLeft: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[3].label}</Typography>
                <Typography variant="h3">
                  {meterInfo[3].number} {meterInfo[3].unit}
                </Typography>
              </div>
            </div>
            { /* Bottom Left */ }
            <div style={{ float: 'right' }} className={classes.meterInfoContainer}>
              <div style={{ marginRight: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[1].label}</Typography>
                <Typography variant="h3">
                  {meterInfo[1].number} {meterInfo[1].unit}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (customer.meterType == "Smart Meter") {
      return (
        <div>
          <OutlinedCardList info={readingInfo} primary={false} grayed={true} />
          <div className={classes.section}>
            { /* Top Left */ }
            <div style={{ float: 'left' }} className={classes.meterInfoContainer}>
              <div style={{ marginRight: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[0].label}</Typography>
                <Typography variant="h3">
                  {meterInfo[0].number} {meterInfo[0].unit}
                </Typography>
              </div>
            </div>
            { /* Top Right */ }
            <div style={{ float: 'left' }} className={classes.meterInfoContainer}>
              <div style={{ marginLeft: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[2].label}</Typography>
                <Typography variant="h3">
                  {meterInfo[2].number} {meterInfo[2].unit}
                </Typography>
              </div>
            </div>
            { /* Bottom Right */ }
            <div style={{ float: 'right' }} className={classes.meterInfoContainer}>
              <div style={{ marginLeft: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[3].label}</Typography>
                <Typography variant="h3">
                  {meterInfo[3].number} {meterInfo[3].unit}
                </Typography>
              </div>
            </div>
            { /* Bottom Left */ }
            <div style={{ float: 'right' }} className={classes.meterInfoContainer}>
              <div style={{ marginRight: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[1].label}</Typography>
                <Typography variant="h3">
                  {meterInfo[1].number} {meterInfo[1].unit}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (customer.meterType == "No Meter") {
      readingInfo = [{ number: UNDEFINED_AMOUNT, label: 'Last Recorded Reading', unit: '' }];
      meterInfo = [
        { number: UNDEFINED_AMOUNT, label: 'Starting Meter', unit: '' },
        { number: periodUsage.toString(), label: 'Period Usage', unit: 'kWh' },
        { number: UNDEFINED_AMOUNT, label: 'Ending Meter', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Amount Billed', unit: '' },
      ];
      return (
        <div>
          <OutlinedCardList info={readingInfo} primary={false} rightIcon={getAddButton()} />
          <div className={classes.section}>
            { /* Top Left */ }
            <div style={{ float: 'left' }} className={classes.meterInfoContainer}>
              <div style={{ marginRight: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[0].label}</Typography>
                <Typography variant="h3" className={classes.gray}>
                  {meterInfo[0].number} {meterInfo[0].unit}
                </Typography>
              </div>
            </div>
            { /* Top Right */ }
            <div style={{ float: 'left' }} className={classes.meterInfoContainer}>
              <div style={{ marginLeft: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[2].label}</Typography>
                <Typography variant="h3" className={classes.gray}>
                  {meterInfo[2].number} {meterInfo[2].unit}
                </Typography>
              </div>
            </div>
            { /* Bottom Right */ }
            <div style={{ float: 'right' }} className={classes.meterInfoContainer}>
              <div style={{ marginLeft: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[3].label}</Typography>
                <Typography variant="h3" className={classes.gray}>
                  {meterInfo[3].number} {meterInfo[3].unit}
                </Typography>
              </div>
            </div>
            { /* Bottom Left */ }
            <div style={{ float: 'right' }} className={classes.meterInfoContainer}>
              <div style={{ marginRight: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[1].label}</Typography>
                <Typography variant="h3">
                  {meterInfo[1].number} {meterInfo[1].unit}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (customer.meterType == "Inactive") {
      readingInfo = [{ number: UNDEFINED_AMOUNT, label: 'Last Recorded Reading', unit: '' }];
      meterInfo = [
        { number: UNDEFINED_AMOUNT, label: 'Starting Meter', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Period Usage', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Ending Meter', unit: '' },
        { number: UNDEFINED_AMOUNT, label: 'Amount Billed', unit: '' },
      ];
      return (
        <div>
          <OutlinedCardList info={readingInfo} primary={false} textColor={'rgba(189,189,189,1)'} />
          <div className={classes.section}>
            { /* Top Left */ }
            <div style={{ float: 'left' }} className={classes.meterInfoContainer}>
              <div style={{ marginRight: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[0].label}</Typography>
                <Typography variant="h3" className={classes.gray}>
                  {meterInfo[0].number} {meterInfo[0].unit}
                </Typography>
              </div>
            </div>
            { /* Top Right */ }
            <div style={{ float: 'left' }} className={classes.meterInfoContainer}>
              <div style={{ marginLeft: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[2].label}</Typography>
                <Typography variant="h3" className={classes.gray}>
                  {meterInfo[2].number} {meterInfo[2].unit}
                </Typography>
              </div>
            </div>
            { /* Bottom Right */ }
            <div style={{ float: 'right' }} className={classes.meterInfoContainer}>
              <div style={{ marginLeft: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[3].label}</Typography>
                <Typography variant="h3" className={classes.gray}>
                  {meterInfo[3].number} {meterInfo[3].unit}
                </Typography>
              </div>
            </div>
            { /* Bottom Left */ }
            <div style={{ float: 'right' }} className={classes.meterInfoContainer}>
              <div style={{ marginRight: '4px' }} className={classes.meterInfo}>
                <Typography variant="body1">{meterInfo[1].label}</Typography>
                <Typography variant="h3">
                  {meterInfo[1].number} {meterInfo[1].unit}
                </Typography>
              </div>
            </div>
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
          <div className={classes.infoContainer}>
            {getTariffInfo()}
          </div>
          <div className={classes.headerWrapper}>
            <Typography variant="h2">Payment</Typography>
            <Link className={classes.buttonSecondary}
              to={{
              pathname: `${match.url}/records`,
              state: { invoices: customer.meterReadings, payments: customer.payments, defaultTab: '1' },
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
              state: { invoices: customer.meterReadings, payments: customer.payments, defaultTab: '0' },
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
  customer: getCurrentCustomer() || EMPTY_CUSTOMER,
});

export default connect(mapStateToProps)(withStyles(styles)(CustomerProfile));
