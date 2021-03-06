import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, Typography, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { Link } from 'react-router-dom';
import { CustomerRecord } from '../../../lib/airtable/interface';
import { setCurrentCustomerIdInRedux, CustomerStatus } from '../../../lib/redux/customerData';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SyncIcon from '@material-ui/icons/Sync';
import { isOfflineId } from '../../../lib/utils/offlineUtils';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';
import { roundToString } from '../../../lib/utils/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContent: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '17px',
      color: theme.palette.text.primary,
    },
    numberText: {
      color: theme.palette.error.main,
      marginLeft: '5px',
    },
    singleCard: {
      /* TODO: could replace with CardContent */
      width: '100%',
      height: '93px',
      border: `1px solid ${theme.palette.text.disabled}`,
      borderRadius: '8px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '10px',
    },
    indicator: (props: CustomerCardProps) => ({
      fontSize: '10px',
      color: props.customer.isactive ? theme.palette.success.main : theme.palette.text.disabled,
      marginRight: '5px',
    }),
    indicatorContainer: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '10px',
    },
    icon: {
      borderRadius: '8px',
      color: 'white',
      padding: '5px',
      backgroundColor: theme.palette.primary.main,
      fontSize: '30px',
    },
    headingRowContainer: {
      display: 'inline-flex',
    },
    syncIcon: {
      marginLeft: theme.spacing(1),
    },
  }),
);

interface CustomerCardProps {
  customer: CustomerRecord;
  match: any;
  status?: CustomerStatus;
}

export default function CustomerCard(props: CustomerCardProps): JSX.Element {
  const intl = useInternationalization(); 
  const classes = useStyles(props);
  const { customer } = props;

  const getStatusIcon = () => {
    if (props.status === CustomerStatus.METER || props.status === CustomerStatus.PAYMENT) {
      return (
        <IconButton
          component={Link}
          to={{ pathname: props.status === CustomerStatus.METER ? `${props.match.url}/customer/meter-readings/create` : `${props.match.url}/customer/payments/create` }}
          size="small"
          onClick={() => setCurrentCustomerIdInRedux(customer.id)}
        >
          {props.status === CustomerStatus.METER ?
            <FlashOnIcon className={classes.icon} />
            :
            <AttachMoneyIcon className={classes.icon} />
          }
        </IconButton>
      );
    }
  }


  return (
      <Card className={classes.singleCard} variant="outlined">
        <Link to={`${props.match.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)} className={classes.cardContent}>
          <div className={classes.indicatorContainer}>
            <FiberManualRecordIcon className={classes.indicator} />
          </div>
          <div>
            <div className={classes.headingRowContainer}>
              <Typography variant="h2">{customer.customerNumber}, {customer.name}</Typography>
              {isOfflineId(customer.id) && <SyncIcon fontSize="small" className={classes.syncIcon} />}
            </div>
            <Typography color="textSecondary">{intl(words.total_x, words.owed)} <span className={classes.numberText}>{roundToString(customer.outstandingBalance)} {intl(words.ks)}</span></Typography>
          </div>
        </Link>
        <CardActions>
          {getStatusIcon()}
          <IconButton component={Link} to={`${props.match.url}/customer`} edge="end" onClick={() => setCurrentCustomerIdInRedux(customer.id)}>
            <ArrowForwardIosIcon fontSize='small' />
          </IconButton>
        </CardActions>
      </Card>
  );
}
