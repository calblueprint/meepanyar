import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, Typography, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { Link } from 'react-router-dom';
import { CustomerRecord } from '../../../lib/airtable/interface';
import { setCurrentCustomerIdInRedux, CustomerStatus } from '../../../lib/redux/customerData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContent: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '17px',
      color: theme.palette.text.primary,
    },
    totalText: {
      color: theme.palette.text.secondary,
    },
    numberText: {
      color: theme.palette.error.main,
      marginLeft: '5px',
    },
    divSpacing: {
      paddingLeft: '15px',
    },
    singleCard: {
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
      height: '7px',
      width: '7px',
      borderRadius: '50%',
      backgroundColor: props.customer.isactive ? theme.palette.secondary.light : theme.palette.text.disabled,
    }),
    arrowSpacing: {
      padding: '0px',
    },
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
  }),
);

interface CustomerCardProps {
  customer: CustomerRecord;
  match: any;
  status?: CustomerStatus;
}

export default function CustomerCard(props: CustomerCardProps): JSX.Element {
  const classes = useStyles(props);
  const customer = props.customer;

  const getStatusIcon = () => {
    if (props.status === CustomerStatus.METER) {
      return (
        <IconButton
          component={Link}
          to={{ pathname: `${props.match.url}/customer/meter-readings/create` }}
          size="small"
          onClick={() => setCurrentCustomerIdInRedux(customer.id)}
        >
          <FlashOnIcon className={classes.icon} fontSize='inherit' />
        </IconButton>
      );
    } else if (props.status === CustomerStatus.PAYMENT) {
      return (
        <IconButton
          component={Link}
          to={{ pathname: `${props.match.url}/customer/payments/create` }}
          size="small"
          onClick={() => setCurrentCustomerIdInRedux(customer.id)}
        >
          <AttachMoneyIcon className={classes.icon} fontSize='inherit' />
        </IconButton>
      );
    }
  }

  return (
      <Card className={classes.singleCard} variant="outlined">
        <Link to={`${props.match.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)} className={classes.cardContent}>
          <div className={classes.indicatorContainer}>
            <div className={classes.indicator} />
          </div>
          <div>
            <Typography variant="h2">{customer.customerNumber}, {customer.name}</Typography>
            <Typography className={classes.totalText}>Total owed <span className={classes.numberText}>{customer.outstandingBalance} Ks</span></Typography>
          </div>
        </Link>
        {getStatusIcon()}
        <CardActions className={classes.arrowSpacing}>
          <IconButton component={Link} to={`${props.match.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)}>
            <ArrowForwardIosIcon fontSize='small' />
          </IconButton>
        </CardActions>
      </Card>
  );
}
