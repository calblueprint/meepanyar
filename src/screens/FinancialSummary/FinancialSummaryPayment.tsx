import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { Button, Typography } from '@material-ui/core';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import FinancialInfo from './components/FinancialInfo';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { connect } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';
import { EMPTY_FINANCIAL_SUMMARY } from '../../lib/redux/siteDataSlice';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
      display: 'flex',
      flexDirection: 'column',
    },
    confirmButton: {
      display: 'flex',
      margin: '0 auto',
      borderColor: theme.palette.primary.main,
      borderRadius: '18px',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      letterSpacing: '0.14em',
      height: '41px',
      width: '70%',
      marginTop: 15,
    },
    cameraButton: {
      backgroundColor: '#F7F9FC',
      height: 130,
      border: `3.5px dashed ${theme.palette.divider}`,
      radius: '6px',
    },
    header: {
      marginTop: 5,
      marginBottom: 10,
    },
});

interface FinancialSummaryPaymentProps extends RouteComponentProps {
  classes: { content: string; confirmButton: string; cameraButton: string; header: string; };
  financialSummary: FinancialSummaryRecord; //TODO: change later to take in one financial summary
  location: any;
}

function FinancialSummaryPayment(props: FinancialSummaryPaymentProps) {
  const { classes, financialSummary } = props;

  return (
    <BaseScreen leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.content}>
          <Typography variant="h2" color="textPrimary" className={classes.header}>
            Financial Info
          </Typography>
          <FinancialInfo bankName={"Aurora"} accountNumber={203203203203} accountName={"Mee"} balance={financialSummary.totalAmountBilled} />
          <Typography variant="h2" color="textPrimary" className={classes.header}>
            Add Photo of Payslip
          </Typography>
          <Button className={classes.cameraButton} variant="contained" color="primary" disableElevation={true}>
            <div>
              <Typography color="primary"><PhotoLibraryIcon /></Typography>
              <Typography variant="h2" color="primary">Upload Photo</Typography>
            </div>
          </Button>
          <Button
            className={classes.confirmButton}
            color="primary"
            fullWidth
            variant="contained"
          >
            <Typography variant="body2">Confirm Payment</Typography>
          </Button>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  financialSummary: state.siteData.currentSite.financialSummaries ? state.siteData.currentSite.financialSummaries[0] : EMPTY_FINANCIAL_SUMMARY,  //TODO: change later to take in one financial summary
});

export default connect(mapStateToProps)(withStyles(styles)(FinancialSummaryPayment));
