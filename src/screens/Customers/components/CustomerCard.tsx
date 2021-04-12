import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Card, CardActions, Typography, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FlashOnIcon from '@material-ui/icons/FlashOn';

const styles = (theme: Theme) =>
  createStyles({
    arrow: {
      color: theme.palette.text.secondary,
      fontSize: '15px',
      marginLeft: '0px',
    },
    cardContent: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '17px',
    },
    totalText: {
      color: theme.palette.text.secondary,
    },
    titleText: {
      fontSize: '19px',
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
  meterNumber: number;
  amount: string;
  active: boolean;
  status?: CustomerStatus;
  classes: {
    arrow: string; cardContent: string; singleCard: string; totalText: string; numberText: string; divSpacing: string; active: string; notActive: string; arrowSpacing: string; indicator: string; icon: string; titleText: string;
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
    if (props.status === CustomerStatus.METER) {
      return ( <FlashOnIcon className={classes.icon} fontSize='inherit' /> );
    } else if (props.status === CustomerStatus.PAYMENT) {
      return ( <AttachMoneyIcon className={classes.icon} fontSize='inherit' /> );
    }
  }

  return (
    <Card className={classes.singleCard} variant="outlined">
      <div className={classes.cardContent}>
        <div className={classes.indicator}>
          {props.active ? <div className={classes.active} /> : <div className={classes.notActive} />}
        </div>
        <div>
          <Typography variant="h2" className={classes.titleText}>{props.meterNumber}, {props.name}</Typography>
          <Typography variant="body1" className={classes.totalText}>Total owed <span className={classes.numberText}>{props.amount} Ks</span></Typography>
        </div>
      </div>
      <CardActions className={classes.arrowSpacing}>
        {getStatusIcon()}
        <IconButton>
          <ArrowForwardIosIcon className={classes.arrow} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
export default withStyles(styles)(CustomerCard);
