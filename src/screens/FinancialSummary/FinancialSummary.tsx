import React, { useEffect, useState }  from 'react';
import { FinancialReportRecord } from '../../utils/airtable/interface';
import { getFinancialReportById } from '../../utils/airtable/requests';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextWrapper from '../../components/TextWrapper';
import ConfirmModal from './ConfirmModal';
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
      "&:last-child": {
        paddingTop: '6px',
        paddingBottom: '16px',
      }
    },
    content: {
      margin: '0px 35px',
    },
    divider: {
      margin: '8px 0',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    cancelButton: {
      borderRadius: '18px',
      borderWidth: '2px',
      borderColor: theme.palette.grey[300],
      letterSpacing: '0.14em',
      height: '41px',
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
    confirmText: {
      margin: '24px 31px',
      textAlign: 'center',
      color: theme.palette.text.primary,
      lineHeight: '120.5%',
    },
    modalContents: {
      backgroundColor: theme.palette.common.white,
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: '15px',
      color: theme.palette.text.primary,
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
      padding: '25px 19px',
    },
    titleTexts: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '18px 0px',
    },
    valueWrappers: {
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: '6px',
      padding: '22px 22px',
    },
    invisibleDivider: {
      backgroundColor: theme.palette.common.white,
      margin: '4px 0',
    }
  }),
);

export default function FinancialSummary() {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [financialSummary, setFinancialSummary] = useState<FinancialReportRecord>();
  
  // useEffect(() => {
  //   getFinancialSummary();
  // }, []);

  const getFinancialSummary = async () => {
    const financialSummary: FinancialReportRecord = await getFinancialReportById('recNoCPefwMb4cwqB');
    setFinancialSummary(financialSummary);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const period = 0;
  const customerLabels = ['Total', 'Billed', 'Paid Up'];
  const customerNumbers = [0, 0, 0];
  const summaryLabels = ['Total Usage', 'Total Billed', 'Total Collected', 'Total Spent'];
  const summaryNumbers = [0, 0, 0, 0];
  const summaryUnits = [' kWh', ' Ks', ' Ks', ' Ks'];
  const modalLabelsOne = ['Total Profit'];
  const modalNumbersOne = [0];
  const modalUnitsOne = [' Ks'];
  const modalLabelsTwo = ['Your Profit', "Mee Panyar's Profit"];
  const modalNumbersTwo = [0, 0];
  const modalUnitsTwo = [' Ks', ' Ks'];
  const modalLabelsThree = ['Profit'];

  const modalContents = (
    <div className={classes.modalContents}>
      <div className={classes.valueWrappers}>
        <TextWrapper title={''} labels={modalLabelsOne} numbers={modalNumbersOne} units={modalUnitsOne} bold />
        <Divider className={classes.invisibleDivider} />
        <TextWrapper title={''} labels={modalLabelsTwo} numbers={modalNumbersTwo} units={modalUnitsTwo} color="textSecondary" bold />
      </div>
      <Typography variant="h4" className={classes.confirmText}>
        Please make sure that you want to close the current period before clicking "Confirm"
      </Typography>
      <div className={classes.buttons}>
        <Button className={classes.cancelButton} color="primary" size="medium" onClick={handleClose} variant="outlined">
          <Typography variant="body1">Cancel</Typography>
        </Button>
        <Button className={classes.confirmButton} size="medium" variant="outlined">
          <Typography variant="body1">Confirm</Typography>
        </Button>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" title="Financial Summary" />
      <div className={classes.content}>
        <ButtonBase className={classes.unpaidRecordsButton}>
          <Typography variant="h2">Unpaid Reports</Typography>
          <Badge classes={{colorError: classes.badge}} badgeContent={1} color="error" />
          <ChevronRightIcon style={{ color: '#BDBDBD' }}/>
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
              labels={summaryLabels.slice(0, 2)}
              numbers={summaryNumbers.slice(0, 2)}
              units={summaryUnits.slice(0, 2)}
            />
            <Divider className={classes.invisibleDivider} />
            <TextWrapper
              title={''}
              labels={summaryLabels.slice(2)}
              numbers={summaryNumbers.slice(2)}
              units={summaryUnits.slice(2)}
            />
            <Divider className={classes.divider} />
            <TextWrapper title={''} labels={modalLabelsThree} numbers={[0]} units={[' Ks']} />
            <TextWrapper title={''} labels={['Total Remaining Owed']} numbers={[0]} units={[' Ks']} color={'primary'} />
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
        <ConfirmModal isOpen={isOpen} modalContents={modalContents} />
      </div>
  );
}
