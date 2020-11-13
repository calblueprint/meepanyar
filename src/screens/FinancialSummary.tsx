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
import Badge from '@material-ui/core/Badge';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    content: {
      margin: '0 25px',
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    confirmButton: {
      borderRadius: '15px',
      borderColor: theme.palette.grey[400],
      marginTop: '-10px',
      float: 'right',
    },
  }),
);

export default function FinancialSummary() {
  const [isOpen, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const period = 0;
  const customerLabels = ['Total', 'Billed', 'Paid Up'];
  const customerNumbers = [0, 0, 0];
  const summaryLabels = [
    'Total Usage',
    'Total Billed',
    'Total Collected',
    'Total Spent',
    'Profit',
    'Total Remaining Owed',
  ];
  const summaryNumbers = [0, 0, 0, 0, 0, 0];
  const summaryUnits = [' kWh', ' Ks', ' Ks', ' Ks', ' Ks', ' Ks'];
  const modalLabelsOne = ['Total Profit', 'Your Share', "Mee Panyar's Share"];
  const modalNumbersOne = [0, 0, 0];
  const modalUnitsOne = [' Ks', '%', '%'];
  const modalLabelsTwo = ['Your Profit', "Mee Panyar's Profit"];
  const modalNumbersTwo = [0, 0];
  const modalUnitsTwo = [' Ks', ' Ks'];

  const modalContents = (
    <div>
      <TextWrapper title={''} labels={modalLabelsOne} numbers={modalNumbersOne} units={modalUnitsOne} />
      <Divider />
      <TextWrapper title={''} labels={modalLabelsTwo} numbers={modalNumbersTwo} units={modalUnitsTwo} />
      <Typography variant="h2">
        Please make sure that you want to close the current period before clicking "Confirm"
      </Typography>
      <Button className={classes.confirmButton} color="primary" variant="outlined" size="small" onClick={handleClose}>
        <Typography variant="h4">Cancel</Typography>
      </Button>
      <Button className={classes.confirmButton} color="primary" variant="outlined" size="small">
        <Typography variant="h4">Confirm</Typography>
      </Button>
    </div>
  );

  return (
    <div>
      <BaseHeader leftIcon="backNav" title="Financial Summary" />
      <Typography variant="h1">Current Period {period}</Typography>
      <Typography variant="h2">View All</Typography>
      <Card>
        <CardContent>
          <TextWrapper title={'Customers'} labels={customerLabels} numbers={customerNumbers} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <TextWrapper
            title={'Financial Summary'}
            labels={summaryLabels}
            numbers={summaryNumbers}
            units={summaryUnits}
          />
        </CardContent>
      </Card>
      <Badge badgeContent={'!'}>
        <Button className={classes.confirmButton} color="primary" variant="outlined" size="small">
          <Typography variant="h4">Records</Typography>
        </Button>
      </Badge>
      <Button
        className={classes.confirmButton}
        color="primary"
        variant="outlined"
        size="small"
        startIcon={<CheckIcon />}
        onClick={handleOpen}
      >
        <Typography variant="h4">Submit Report</Typography>
      </Button>
      <ConfirmModal isOpen={isOpen} modalContents={modalContents} />
    </div>
  );
}
