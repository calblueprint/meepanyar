import React from 'react';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import { TextField, Typography, Button } from '@material-ui/core';
import OutlinedColCard from '../../components/OutlinedCardList';
import { RouteComponentProps } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100vh',
    },
    content: {
      textAlign: 'left',
      color: theme.palette.text.secondary,
      padding: '0px 20px 80px',
      width: '100%',
      height: '80vh',
      overflow: 'auto',
    },
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
    searchContainer: {
      float: 'right',
      padding: '0px 30px',
    },
    searchIcon: {
      fontSize: '20px',
      color: theme.palette.text.primary,
      marginTop: '-5px',
    },
    search: {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '10px',
      width: '130px',
      height: '25px',
      padding: '2px 10px',
    },
    title: {
      marginTop: '20px',
    },
  });

interface FinancialSummariesProps extends RouteComponentProps {
  classes: {
    root: string;
    content: string;
    payButton: string;
    viewButton: string;
    searchIcon: string;
    searchContainer: string;
    search: string;
    title: string;
  };
  financialSummaries?: any;
  location: any;
}

function FinancialSummaries(props: FinancialSummariesProps) {
  const { classes, financialSummaries } = props;
  let paidFinancialSummaries: any[] = [];
  let unpaidFinancialSummaries: any[] = [];

  const formatFinancialSummaries = (summaries: FinancialSummaryRecord[]) => {
      summaries.forEach(summary => {
        const entry = { number: summary.totalAmountBilled, label: summary.lastUpdated, unit: 'MMK'};
        if (summary.totalCustomersBilled === summary.totalCustomersPaid) {
          paidFinancialSummaries.push(entry);
        } else {
          unpaidFinancialSummaries.push(entry);
        }
      });
  };

  formatFinancialSummaries(financialSummaries);

  const getSearch = () => {
    return (
      <div className={classes.searchContainer}>
        <TextField
          className={classes.search}
          size="small"
          InputProps={{
            style: { fontSize: 14 },
            disableUnderline: true,
            autoComplete: 'off',
            endAdornment: <SearchIcon className={classes.searchIcon} />,
           }}
          color="primary"
        />
      </div>
    );
  };

  const getPaymentButtons = () => {
    return (
      <Button className={classes.payButton} variant="contained" color="primary" disableElevation>Pay</Button>
    );
  };

  const getViewButtons = () => {
    return (
      <Button className={classes.viewButton} variant="contained" color="primary" disableElevation={true}>View</Button>
    );
  };

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" title="Reports" />
      {getSearch()}
      <div className={classes.content}>
        <Typography className={classes.title} variant="body1">
          Unpaid Reports
        </Typography>
        {unpaidFinancialSummaries.map((report: any, index: number) => (
          <OutlinedColCard key={index} info={[report]} primary={false} rightIcon={getPaymentButtons()} />
        ))}
        <Typography className={classes.title} variant="body1">
          Paid Reports
        </Typography>
        {paidFinancialSummaries.map((report: any, index: number) => (
          <OutlinedColCard key={index} info={[report]} primary={false} rightIcon={getViewButtons()} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  financialSummaries: state.siteData.currentSite.financialSummaries || '',
});

export default connect(mapStateToProps)(withStyles(styles)(FinancialSummaries));
