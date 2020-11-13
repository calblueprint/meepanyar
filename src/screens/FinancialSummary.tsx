import React from 'react';
import BaseHeader from '../components/BaseComponents/BaseHeader';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextWrapper from '../components/TextWrapper';
import ConfirmModal from '../components/ConfirmModal';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Badge from '@material-ui/core/Badge';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      color: theme.palette.text.primary,
    },
    card: {
      margin: '10px 10px',
    },
    cardContent: {
      '&:last-child': {
        paddingBottom: '16px',
      },
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
      borderColor: theme.palette.divider,
      letterSpacing: '0.14em',
      height: '41px',
    },
    confirmButton: {
      borderColor: theme.palette.primary.main,
      borderRadius: '18px',
      backgroundColor: theme.palette.primary.main,
      color: '#FFFFFF',
      letterSpacing: '0.14em',
      height: '41px',
    },
    unpaidRecordsButton: {
      borderRadius: '12px',
      backgroundColor: '#F7F9FC',
      color: '#6A6A6A',
    },
    confirmText: {
      margin: '24px 31px',
      textAlign: 'center',
      color: theme.palette.text.primary,
      lineHeight: '120.5%',
    },
    modalContents: {
      backgroundColor: '#FFFFFF',
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
  }),
);

export default function FinancialSummary() {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);

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
        <TextWrapper title={''} labels={modalLabelsOne} numbers={modalNumbersOne} units={modalUnitsOne} />
        <TextWrapper title={''} labels={modalLabelsTwo} numbers={modalNumbersTwo} units={modalUnitsTwo} />
      </div>
      <Typography variant="h4" className={classes.confirmText}>
        Please make sure that you want to close the current period before clicking "Confirm"
      </Typography>
      <div className={classes.buttons}>
        <Button className={classes.cancelButton} color="primary" size="medium" onClick={handleClose} variant="outlined">
          <Typography variant="h4">Cancel</Typography>
        </Button>
        <Button className={classes.confirmButton} size="medium" variant="outlined">
          <Typography variant="h4">Confirm</Typography>
        </Button>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" title="Financial Summary" />
      <div className={classes.content}>
        <Button className={classes.unpaidRecordsButton} fullWidth endIcon={<ChevronRightIcon />}>
          <Typography variant="h2">Unpaid Reports</Typography>
        </Button>
        <div className={classes.titleTexts}>
          <Typography variant="h3">Current Period {period}</Typography>
          <Typography color="primary" variant="h4">
            View All
          </Typography>
        </div>
        <Card variant="outlined">
          <CardContent className={classes.cardContent}>
            <TextWrapper title={'Customers'} labels={customerLabels} numbers={customerNumbers} />
            <TextWrapper
              title={'Financial Summary'}
              labels={summaryLabels}
              numbers={summaryNumbers}
              units={summaryUnits}
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
          <Typography variant="h4">Submit Report</Typography>
        </Button>
        <ConfirmModal isOpen={isOpen} modalContents={modalContents} />
      </div>
    </div>
  );
}
