import React from 'react';
import { navigateToCamera } from '../../lib/utils/cameraUtils';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { Button, Typography } from '@material-ui/core';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import FinancialInfo from './components/FinancialInfo';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { useSelector } from 'react-redux';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';
import { EMPTY_FINANCIAL_SUMMARY, selectAllFinancialSummariesArray } from '../../lib/redux/siteDataSlice';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

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
  location: any;
}

function FinancialSummaryPayment(props: FinancialSummaryPaymentProps) {
  const intl = useInternationalization(); 
  const { classes } = props;

  // TODO: Change to select the correct summary
  const financialSummaries : FinancialSummaryRecord[] = useSelector(selectAllFinancialSummariesArray) || [];
  const financialSummary : FinancialSummaryRecord = financialSummaries.length  > 0 ? financialSummaries[0] : EMPTY_FINANCIAL_SUMMARY;

  return (
    <BaseScreen leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.content}>
          <Typography variant="h2" color="textPrimary" className={classes.header}>
            {intl(words.financial_info)}
          </Typography>
          <FinancialInfo bankName={"Aurora"} accountNumber={203203203203} accountName={"Mee"} balance={financialSummary.totalAmountBilled} />
          <Typography variant="h2" color="textPrimary" className={classes.header}>
            {intl(words.add_x, words.photo_of_payslip)}
          </Typography>
          <Button
            className={classes.cameraButton}
            variant="contained"
            color="primary"
            disableElevation={true}
            onClick={() => navigateToCamera({})}
          >
            <div>
              <Typography color="primary"><PhotoLibraryIcon /></Typography>
              <Typography variant="h2" color="primary">{intl(words.upload_x, words.photo)}</Typography>
            </div>
          </Button>
          <Button
            className={classes.confirmButton}
            color="primary"
            fullWidth
            variant="contained"
          >
            <Typography variant="body2">{intl(words.confirm_x, words.payment)}</Typography>
          </Button>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(FinancialSummaryPayment);
