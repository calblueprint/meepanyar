import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { Button, Typography } from '@material-ui/core';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import FinancialInfo from './components/FinancialInfo';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
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
      width: '95%',
      height: 130,
      margin: 10,
      border: '3.5px dashed ' + theme.palette.divider,
      radius: '6px',
    },
    cameraText: {
      color: theme.palette.primary.main,
    }
});

interface ConfirmPaymentProps extends RouteComponentProps {
  classes: { content: string; confirmButton: string; cameraButton: string; cameraText: string; };
  financialSummary: FinancialSummaryRecord;
  location: any;
}

function ConfirmPayment(props: ConfirmPaymentProps) {
  const { classes, financialSummary } = props;

  return (
    <BaseScreen leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.content}>
          <FinancialInfo bankName={"Aurora"} accountNumber={203} accountName={"Mee"} balance={financialSummary.totalAmountBilled} />
          <Typography variant="h2" color="textPrimary">
            Add Photo of Payslip
          </Typography>
          <Button className={classes.cameraButton} variant="contained" color="primary" disableElevation={true}>
            <div className={classes.cameraText}>
              <PhotoLibraryIcon /><br />
              Upload Photo
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

export default withStyles(styles)(ConfirmPayment);
