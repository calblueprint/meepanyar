import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Card, CardActions, Typography, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { Link } from 'react-router-dom';
import { setCurrentCustomerIdInRedux } from '../../../lib/redux/customerData';

const styles = (theme: Theme) =>
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
      border: '1px solid ' + theme.palette.text.disabled,
      borderRadius: '8px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '10px',
    },
    active: {
      height: '7px',
      width: '7px',
      borderRadius: '50%',
      backgroundColor: theme.palette.secondary.light,
    },
    notActive: {
      height: '7px',
      width: '7px',
      borderRadius: '50%',
      backgroundColor: theme.palette.text.disabled,
    },
    arrowSpacing: {
      padding: '0px',
    },
    indicator: {
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
  });

interface CardProps {
  name: string;
  customerId: string;
  meterNumber: number;
  amount: string;
  active: boolean;
  match: any;
  status?: CustomerStatus;
  classes: {
    cardContent: string; singleCard: string; totalText: string; numberText: string; divSpacing: string; active: string; notActive: string; arrowSpacing: string; indicator: string; icon: string;
  };
}

export enum CustomerStatus {
  METER = 'Meter' as any,
  PAYMENT = 'Payment' as any,
  DONE = 'Done' as any,
}

function CustomerCard(props: CardProps) {
  const { classes } = props;

  const getStatusIcon = () => {
    /* TODO: replace paths /customer/edit with actual paths */
    if (props.status === CustomerStatus.METER) {
      return (
        <IconButton
          component={Link}
          to={{
            pathname: `${props.match.url}/customer/edit`,
          }}
          size="small"
        >
          <FlashOnIcon className={classes.icon} fontSize='inherit' />
        </IconButton>
      );
    } else if (props.status === CustomerStatus.PAYMENT) {
      return (
        <IconButton
          component={Link}
          to={{
            pathname: `${props.match.url}/customer/edit`,
          }}
          size="small"
        >
          <AttachMoneyIcon className={classes.icon} fontSize='inherit' />
        </IconButton>
      );
    }
  }

  return (
      <Card className={classes.singleCard} variant="outlined">
        <Link to={`${props.match.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(props.customerId)} className={classes.cardContent}>
          <div className={classes.indicator}>
            {props.active ? <div className={classes.active} /> : <div className={classes.notActive} />}
          </div>
          <div>
            <Typography variant="h2">{props.meterNumber}, {props.name}</Typography>
            <Typography className={classes.totalText}>Total owed <span className={classes.numberText}>{props.amount} Ks</span></Typography>
          </div>
        </Link>
        {getStatusIcon()}
        <CardActions className={classes.arrowSpacing}>
          <IconButton component={Link} to={`${props.match.url}/customer`}>
            <ArrowForwardIosIcon fontSize='small' />
          </IconButton>
        </CardActions>
      </Card>
  );
}
export default withStyles(styles)(CustomerCard);
