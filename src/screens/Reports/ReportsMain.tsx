import React from 'react';
import ReportCard from './components/ReportCard';
import { FinancialSummaryRecord, CustomerRecord } from '../../lib/airtable/interface';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { RouteComponentProps } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { selectCustomersToCollect, selectCustomersDone, selectTotalAmountBilled, selectTotalAmountCollected } from '../../lib/redux/customerData';
import { selectAmountPurchaseRequestedApproved, selectAmountPurchaseRequestedDenied } from '../../lib/redux/inventoryData';
import { selectAllCustomersArray } from '../../lib/redux/customerDataSlice';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';
import { selectAllFinancialSummariesArray } from '../../lib/redux/siteDataSlice';
import { getCurrentPeriod, getCurrentMonthGracePeriodDeadline, formatDateStringToLocal } from '../../lib/moment/momentUtils';
import { useSelector } from 'react-redux';
import moment from 'moment';

const styles = (theme: Theme) =>
  createStyles({
    section: {
      padding: '10px 5px',
    },
  });

interface ReportsMainProps extends RouteComponentProps {
  classes: { section: string; };
  location: any;
}

function ReportsMain(props: ReportsMainProps) {
  const { classes, match } = props;
  const currentSite = useSelector(selectCurrentSiteInformation);
  const currentDeadline = formatDateStringToLocal(getCurrentMonthGracePeriodDeadline().toString());

  const customers = useSelector(selectAllCustomersArray);
  const customersBilled = useSelector(selectCustomersToCollect);
  const customersPaid = useSelector(selectCustomersDone);
  const totalAmountBilled = useSelector(selectTotalAmountBilled);
  const totalAmountCollected =  useSelector(selectTotalAmountCollected);
  const inventoryAmountApproved = useSelector(selectAmountPurchaseRequestedApproved);
  const inventoryAmountDenied = useSelector(selectAmountPurchaseRequestedDenied);

  const currentReport: FinancialSummaryRecord = {
    id: '',
    name: '',
    totalCustomers: customers.length,
    totalCustomersBilled: customersBilled.length,
    totalCustomersPaid: customersPaid.length,
    totalUsage: 0,
    totalAmountBilled,
    totalAmountCollected,
    totalAmountSpent: 0,
    totalProfit: totalAmountCollected - inventoryAmountApproved,
    inventoryAmountApproved,
    inventoryAmountDenied,
    period: getCurrentPeriod(),
    isapproved: false,
    lastUpdated: '0',
    issubmitted: false,
  }
  const reports: FinancialSummaryRecord[] = useSelector(selectAllFinancialSummariesArray) || [];

  const getDeadline = (report: FinancialSummaryRecord) => {
    const m = moment(new Date(report.period)).endOf('month');
    const d = moment.duration({'days' : currentSite.gracePeriod});
    m.add(d);
    return formatDateStringToLocal(m.toString());
  }

  return (
    <BaseScreen leftIcon="backNav" title="Reports" rightIcon="profile" match={match}>
      <BaseScrollView>
        <div className={classes.section}>
          <Typography variant="h1">Current Period</Typography>
          <ReportCard
            report={currentReport}
            deadline={currentDeadline}
            match={match}
            current
          />
        </div>
        <div className={classes.section}>
          <Typography variant="h1">All Reports</Typography>
          {reports.map((report: FinancialSummaryRecord, index) => (
            <div key={index}>
              <ReportCard
                report={report}
                deadline={getDeadline(report)}
                match={match}
              />
            </div>
          ))}
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(ReportsMain);
