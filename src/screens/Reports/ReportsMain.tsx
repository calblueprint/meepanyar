import React from 'react';
import ReportCard from './components/ReportCard';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { RouteComponentProps } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { selectAllFinancialSummariesArray } from '../../lib/redux/siteDataSlice';
import { useSelector } from 'react-redux';

const styles = (theme: Theme) =>
  createStyles({
  });

interface ReportsMainProps extends RouteComponentProps {
  classes: { };
  location: any;
}

function ReportsMain(props: ReportsMainProps) {
  const { classes, match } = props;
  const reports: FinancialSummaryRecord[] = useSelector(selectAllFinancialSummariesArray) || [];

  return (
    <BaseScreen leftIcon="backNav" title="Reports" rightIcon="profile" match={match}>
      <Typography variant="h1">Current Period</Typography>
      <Typography variant="h1">All Reports</Typography>
      <BaseScrollView>
        {reports.map((report: FinancialSummaryRecord, index) => (
          <div key={index}>
            <ReportCard
              report={report}
              match={match}
            />
          </div>
        ))}
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(ReportsMain);
