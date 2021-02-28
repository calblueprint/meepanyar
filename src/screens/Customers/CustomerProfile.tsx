import React from 'react';
import Typography from '@material-ui/core/Typography';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import OutlinedColCard, { CardPropsInfo } from '../../components/OutlinedCardList';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { CustomerRecord, SiteRecord, MeterReadingRecord } from '../../lib/airtable/interface';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { getCurrentReading, getStartingReading, getPeriodUsage, getAmountBilled } from '../../lib/utils/customerUtils';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    header: {
      marginTop: '15px',
    },
    button: {
      borderRadius: '12px',
      height: '30px',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    buttonSecondary: {
      borderRadius: '12px',
      backgroundColor: theme.palette.secondary.main,
    },
  });

interface CustomerProps extends RouteComponentProps {
  classes: { content: string; header: string; button: string; buttonSecondary: string };
  currentSite: SiteRecord;
  location: any;
}

function CustomerProfile(props: CustomerProps) {
  const { classes, match, currentSite } = props;
  const customer: CustomerRecord = props.location.state.customer;

  // data retrieval
  const UNDEFINED_AMOUNT = '-';
  const currReading: MeterReadingRecord | undefined = getCurrentReading(customer);
  const startingReading: MeterReadingRecord | undefined = getStartingReading(customer);
  const periodUsage: number | string = currReading ? getPeriodUsage(currReading, startingReading) : UNDEFINED_AMOUNT;
  const amountBilled: number | string = currReading ? getAmountBilled(currReading) : UNDEFINED_AMOUNT;

  const meterInfo: CardPropsInfo[] = [
    { number: startingReading? startingReading.amountBilled.toString() : UNDEFINED_AMOUNT, label: 'Starting Meter', unit: 'kWh' },
    { number: periodUsage.toString(), label: 'Period Usage', unit: 'kWh' },
    { number: amountBilled.toString(), label: 'Amount Billed', unit: 'kS' },
  ];
  const balanceInfo: CardPropsInfo[] = [{ number: customer.outstandingBalance.toString(), label: 'Remaining Balance', unit: 'kS' }];
  const readingInfo: CardPropsInfo[] = [{ number: currReading? currReading.amountBilled.toString() : UNDEFINED_AMOUNT, label: 'Current Reading', unit: 'kWh' }];

  const getPaymentButtons = () => {
    return (
      <>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          startIcon={<AddIcon />}
          disableElevation={true}
        >
          Add Payment
        </Button>
        <div className={classes.buttonSecondary}>
          <IconButton
            component={Link}
            to={{
              pathname: `${match.url}/records`,
              state: { invoices: customer.meterReadings, payments: customer.payments },
            }}
            size="small"
          >
            <ListAltOutlinedIcon color="primary" />
          </IconButton>
        </div>
      </>
    );
  };

  const getAddButton = () => {
    return (
      <div className={classes.button}>
        <IconButton
          component={Link}
          to={{
            pathname: `${match.url}/meter-readings/create`,
            state: { invoices: customer.meterReadings, payments: customer.payments },
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
          <Typography variant="h4" color="textSecondary">
            {customer.meterNumber}
          </Typography>

          <Typography className={classes.header} variant="h2">
            Payment
          </Typography>
          <OutlinedColCard info={balanceInfo} primary={true} rightIcon={getPaymentButtons()} />

          <Typography className={classes.header} variant="h2">
            Meter Reading
          </Typography>
          <OutlinedColCard info={readingInfo} primary={true} rightIcon={getAddButton()} />
          <OutlinedColCard info={meterInfo} primary={false} />
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite || EMPTY_SITE,
});

export default connect(mapStateToProps)(withStyles(styles)(CustomerProfile));
