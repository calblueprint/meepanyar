import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeInfoRow from './HomeInfoRow';
import { StylesProvider, Button, Card, CardContent, Paper, Typography } from '@material-ui/core';
import useStyles from '../styles/HomeInfoStyles';

type HomeInfoProps = {
  customer: string;
  payment: string;
  unpaid: string;
  incidents: string;
};

const classes = useStyles();

const HomeInfoCard = ({ customer, payment, unpaid, incidents }: HomeInfoProps) => (
  <StylesProvider injectFirst>
    <Paper className={classes.mainCard} elevation={0}>
      <HomeInfoRow amount={customer} name={'Customers to Charge'} />
      <HomeInfoRow amount={payment} name={'Outstanding Payments'} />
      <HomeInfoRow amount={unpaid} name={'Unpaid Reports'} />
      <HomeInfoRow amount={incidents} name={'Unresolved Incidents'} />
    </Paper>
  </StylesProvider>
);

export default HomeInfoCard;
