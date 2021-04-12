import React from 'react';
import { Typography, Button } from '@material-ui/core';
import OutlinedCardList, { CardPropsInfo } from '../../components/OutlinedCardList';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { RouteComponentProps } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';
import { selectAllFinancialSummariesArray } from '../../lib/redux/siteDataSlice';

const styles = (theme: Theme) =>
  createStyles({
    payButton: {
      borderRadius: '12px',
      height: '30px',
      width: '80px',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    viewButton: {
      borderRadius: '12px',
      height: '30px',
      width: '80px',
      color: theme.palette.primary.main,
      backgroundColor: 'white',
      border: `1px solid ${theme.palette.primary.main}`,
    },
    title: {
      marginTop: '20px',
    },
  });

interface FinancialSummariesMainProps extends RouteComponentProps {
  classes: {
    payButton: string;
    viewButton: string;
    title: string;
  };
  financialSummaries: FinancialSummaryRecord[];
  location: any;
}

function FinancialSummariesMain(props: FinancialSummariesMainProps) {
  const { classes } = props;
  let paidFinancialSummaries: CardPropsInfo[] = [];
  let unpaidFinancialSummaries: CardPropsInfo[] = [];
  const financialSummaries = useSelector(selectAllFinancialSummariesArray);

  const formatFinancialSummaries = (summaries: FinancialSummaryRecord[]) => {
      summaries.forEach(summary => {
        const entry = { number: summary.period.toString(), label: summary.lastUpdated, unit: ''};
        if (summary.totalCustomersBilled === summary.totalCustomersPaid) {
          paidFinancialSummaries.push(entry);
        } else {
          unpaidFinancialSummaries.push(entry);
        }
      });
  };

  formatFinancialSummaries(financialSummaries);

  const getPaymentButton = () => {
    return (
      <Button className={classes.payButton} variant="contained" color="primary" disableElevation>Pay</Button>
    );
  };

  const getViewButton = () => {
    return (
      <Button className={classes.viewButton} variant="contained" color="primary" disableElevation={true}>View</Button>
    );
  };

  return (
    <BaseScreen leftIcon="backNav" title="Reports">
      <BaseScrollView>
        <Typography className={classes.title} variant="body1">
          Unpaid Reports
        </Typography>
        {/* Report is put into an array for styling, to make a new card for each given report. */}
        {unpaidFinancialSummaries.map((report: any, index: number) => (
          <OutlinedCardList key={index} info={[report]} primary={false} rightIcon={getPaymentButton()} />
        ))}
        <Typography className={classes.title} variant="body1">
          Paid Reports
        </Typography>
        {/* Report is put into an array for styling, to make a new card for each given report. */}
        {paidFinancialSummaries.map((report: any, index: number) => (
          <OutlinedCardList key={index} info={[report]} primary={false} rightIcon={getViewButton()} />
        ))}
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(FinancialSummariesMain);
