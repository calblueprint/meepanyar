import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import HomeInfoRow from './HomeInfoRow';
import { StylesProvider, Button, Card, CardContent, Paper, Typography } from '@material-ui/core';


const styles = (theme: Theme) =>
  createStyles({
    mainCard: {
      width: '308.81px',
      height: '257.81px',
      background: '#ffffff',
      border: '1px solid #e5e5e5',
      boxSizing: 'border-box',
      borderRadius: '6px',
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  });


type HomeInfoProps = {
  customer: string;
  payment: string;
  unpaid: string;
  incidents: string;
  classes: { mainCard: string };
};


function HomeInfoCard(props: HomeInfoProps) {
  const { classes } = props;

  return (
    <Paper className={classes.mainCard} elevation={0}>
      <HomeInfoRow amount={props.customer} name={'Customers to Charge'} />
      <HomeInfoRow amount={props.payment} name={'Outstanding Payments'} />
      <HomeInfoRow amount={props.unpaid} name={'Unpaid Reports'} />
      <HomeInfoRow amount={props.incidents} name={'Unresolved Incidents'} />
    </Paper>
  );
}



export default withStyles(styles)(HomeInfoCard);
