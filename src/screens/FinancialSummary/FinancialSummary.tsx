import React, { useEffect, useState } from 'react';
import Badge from '@material-ui/core/Badge';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ConfirmDialog from './ConfirmDialog';
import ConfirmDialogContents from './ConfirmDialogContents';
import Divider from '@material-ui/core/Divider';
import TextWrapper from '../../components/TextWrapper';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { FinancialSummaryRecord } from '../../utils/airtable/interface';
import { getFinancialSummaryById } from '../../utils/airtable/requests';
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
    bottomMargin: {
      marginBottom: '10px',
    },
  }),
);

export default function FinancialSummary(): JSX.Element {
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
    const financialSummary: FinancialSummaryRecord = await getFinancialSummaryById('recNoCPefwMb4cwqB');
    setCustomerNumbers(getCustomerNumbers(financialSummary));
    setFinancialSummaryNumbers(getFinancialSummaryNumbers(financialSummary));
    setProfitNumbers(getProfitNumbers(financialSummary));
    setRemainingOwed(getRemainingOwed(financialSummary));
  };

  const getCustomerNumbers = (financialSummary: FinancialSummaryRecord) => {
    return [financialSummary.totalCustomers, financialSummary.totalCustomersBilled, financialSummary.totalCustomersPaid];
  };

  const getFinancialSummaryNumbers = (financialSummary: FinancialSummaryRecord) => {
    return [
      financialSummary.totalUsage,
      financialSummary.totalAmountBilled,
      financialSummary.totalAmountCollected,
      financialSummary.totalAmountSpent,
    ];
  };

  const getProfitNumbers = (financialSummary: FinancialSummaryRecord) => {
    return [financialSummary.totalProfit];
  };

  const getRemainingOwed = (financialSummary: FinancialSummaryRecord) => {
    return [financialSummary.totalAmountBilled - financialSummary.totalAmountCollected];
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
              styling={classes.bottomMargin}
            />
            <TextWrapper
              labels={financialSummaryLabels.slice(2)}
              numbers={financialSummaryNumbers.slice(2)}
              units={financialSummaryUnits.slice(2)}
            />
            <Divider className={classes.divider} />
            <TextWrapper labels={profitLabel} numbers={profitNumbers} units={currencyUnits} />
            <TextWrapper labels={remainingOwedLabel} numbers={remainingOwed} units={currencyUnits} color={'primary'} />
          </CardContent>
        </Card>
        <Button
          className={classes.confirmButton}
          color="primary"
          startIcon={<CheckIcon />}
          onClick={handleOpen}
          fullWidth
          variant="contained"
        >
          <Typography variant="body1">Submit Report</Typography>
        </Button>
      </div>
      <ConfirmDialog
        isOpen={isOpen}
        dialogContents={<ConfirmDialogContents onClick={handleClose} profitNumbers={profitNumbers} />}
      />
    </div>
  );
}
