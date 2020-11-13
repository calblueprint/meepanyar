import React, { useEffect, useState } from 'react';
import { FinancialReportRecord } from '../../utils/airtable/interface';
import { getFinancialReportById } from '../../utils/airtable/requests';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextWrapper from '../../components/TextWrapper';
import ConfirmModal from './ConfirmModal';
import ConfirmModalContents from './ConfirmModalContents';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Badge from '@material-ui/core/Badge';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
    },
    badge: {
      backgroundColor: theme.palette.info.main,
      fontSize: '16px',
      fontWeight: 700,
      marginLeft: '50px',
    },
    card: {
      marginBottom: '24px',
    },
    cardContent: {
      '&:last-child': {
        paddingTop: '6px',
        paddingBottom: '16px',
      },
    },
    content: {
      margin: '0px 35px',
    },
    divider: {
      margin: '8px 0',
    },
    confirmButton: {
      borderColor: theme.palette.primary.main,
      borderRadius: '18px',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      letterSpacing: '0.14em',
      height: '41px',
    },
    unpaidRecordsButton: {
      display: 'flex',
      justifyContent: 'space-around',
      borderRadius: '12px',
      backgroundColor: '#F7F9FC',
      color: '#6A6A6A',
      height: '62px',
      width: '100%',
    },
    titleTexts: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '18px 0px',
    },
    invisibleDivider: {
      backgroundColor: theme.palette.common.white,
      margin: '4px 0',
    },
  }),
);

export default function FinancialSummary() {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [customerNumbers, setCustomerNumbers] = useState<number[]>([]);
  const [financialSummaryNumbers, setFinancialSummaryNumbers] = useState<number[]>([]);
  const [profitNumbers, setProfitNumbers] = useState<number[]>([]);
  const [remainingOwed, setRemainingOwed] = useState<number[]>([]);

  useEffect(() => {
    getFinancialSummary();
  }, []);

  const getFinancialSummary = async () => {
    const financialSummary: FinancialReportRecord = await getFinancialReportById('recNoCPefwMb4cwqB');
    setCustomerNumbers(getCustomerNumbers(financialSummary));
    setFinancialSummaryNumbers(getFinancialSummaryNumbers(financialSummary));
    setProfitNumbers(getProfitNumbers(financialSummary));
    setRemainingOwed(getRemainingOwed(financialSummary));
  };

  const getCustomerNumbers = (financialSummary: FinancialReportRecord) => {
    return [financialSummary.numTotalCustomers, financialSummary.numBilledCustomers, financialSummary.numPaidCustomers];
  };

  const getFinancialSummaryNumbers = (financialSummary: FinancialReportRecord) => {
    return [
      financialSummary.electricityUsage,
      financialSummary.tariffsCharged,
      financialSummary.amountCollected,
      financialSummary.totalExpenses,
    ];
  };

  const getProfitNumbers = (financialSummary: FinancialReportRecord) => {
    return [financialSummary.totalProfit];
  };

  const getRemainingOwed = (financialSummary: FinancialReportRecord) => {
    return [financialSummary.totalOutstandingPayments];
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const period = 0;
  const customerLabels = ['Total', 'Billed', 'Paid Up'];
  const financialSummaryLabels = ['Total Usage', 'Total Billed', 'Total Collected', 'Total Spent'];
  const financialSummaryUnits = [' kWh', ' Ks', ' Ks', ' Ks'];
  const profitLabel = ['Profit'];
  const remainingOwedLabel = ['Total Remaining Owed'];
  const currencyUnits = [' Ks'];

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" title="Financial Summary" />
      <div className={classes.content}>
        <ButtonBase className={classes.unpaidRecordsButton}>
          <Typography variant="h2">Unpaid Reports</Typography>
          <Badge classes={{ colorError: classes.badge }} badgeContent={1} color="error" />
          <ChevronRightIcon style={{ color: '#BDBDBD' }} />
        </ButtonBase>
        <div className={classes.titleTexts}>
          <Typography style={{ fontWeight: 500, fontSize: '24px' }}>Current Period {period}</Typography>
          <Typography style={{ fontWeight: 700, fontSize: '14px' }} color="primary" variant="h4">
            View All
          </Typography>
        </div>
        <Card className={classes.card} variant="outlined">
          <CardContent className={classes.cardContent}>
            <TextWrapper title={'Customers'} labels={customerLabels} numbers={customerNumbers} />
            <TextWrapper
              title={'Financial Summary'}
              labels={financialSummaryLabels.slice(0, 2)}
              numbers={financialSummaryNumbers.slice(0, 2)}
              units={financialSummaryUnits.slice(0, 2)}
            />
            <Divider className={classes.invisibleDivider} />
            <TextWrapper
              title={''}
              labels={financialSummaryLabels.slice(2)}
              numbers={financialSummaryNumbers.slice(2)}
              units={financialSummaryUnits.slice(2)}
            />
            <Divider className={classes.divider} />
            <TextWrapper title={''} labels={profitLabel} numbers={profitNumbers} units={currencyUnits} />
            <TextWrapper
              title={''}
              labels={remainingOwedLabel}
              numbers={remainingOwed}
              units={currencyUnits}
              color={'primary'}
            />
          </CardContent>
        </Card>
        <Button
          className={classes.confirmButton}
          color="primary"
          startIcon={<CheckIcon />}
          onClick={handleOpen}
          fullWidth
        >
          <Typography variant="body1">Submit Report</Typography>
        </Button>
      </div>
      <ConfirmModal
        isOpen={isOpen}
        modalContents={<ConfirmModalContents onClick={handleClose} profitNumbers={profitNumbers} />}
      />
    </div>
  );
}
