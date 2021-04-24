import React from 'react';
import ReportCard from './components/ReportCard';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { RouteComponentProps } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { selectCurrentSiteInformation, selectCurrentFinancialSummary } from '../../lib/redux/siteData';
import { selectAllFinancialSummariesArray } from '../../lib/redux/siteDataSlice';
import { getCurrentMonthGracePeriodDeadline, formatDateStringToLocal, getDeadline } from '../../lib/moment/momentUtils';
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

  const currentReport = selectCurrentFinancialSummary();
  const reports: FinancialSummaryRecord[] = useSelector(selectAllFinancialSummariesArray) || [];

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
                deadline={getDeadline(report, currentSite)}
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
