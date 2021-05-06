import React from 'react';
import ReportCard from './components/ReportCard';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { RouteComponentProps } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { selectCurrentSiteInformation, selectCurrentPeriodFinancialSummary } from '../../lib/redux/siteData';
import { selectAllFinancialSummariesArray } from '../../lib/redux/siteDataSlice';
import { getCurrentMonthGracePeriodDeadline, formatDateStringToLocal, getGracePeriodDeadline } from '../../lib/moment/momentUtils';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

const styles = (theme: Theme) =>
  createStyles({
    section: {
      padding: '10px 5px',
    },
  });

interface FinancialSummariesProps extends RouteComponentProps {
  classes: { section: string; };
  location: any;
}

function FinancialSummaries(props: FinancialSummariesProps) {
  const intl = useInternationalization(); 
  const { classes, match } = props;
  const currentSite = useSelector(selectCurrentSiteInformation);
  const currentDeadline = formatDateStringToLocal(getCurrentMonthGracePeriodDeadline().toString());

  const currentReport = selectCurrentPeriodFinancialSummary();
  const reports: FinancialSummaryRecord[] = useSelector(selectAllFinancialSummariesArray) || [];
  
  reports.sort((a: FinancialSummaryRecord, b: FinancialSummaryRecord) => {
    const bDate = moment(b.lastUpdated);
    const aDate = moment(a.lastUpdated);
    const difference = bDate.diff(aDate, 'minutes')
    return difference;
  });

  return (
    <BaseScreen leftIcon="backNav" title={intl(words.reports)} rightIcon="profile" match={match}>
      <BaseScrollView>
        <div className={classes.section}>
          <Typography variant="h1">{intl(words.current_x, words.period)}</Typography>
          <ReportCard
            report={currentReport}
            deadline={currentDeadline}
            current
          />
        </div>
        <div className={classes.section}>
          <Typography variant="h1">{intl(words.all_x, words.reports)}</Typography>
          {reports.map((report: FinancialSummaryRecord, index) => {
            if (report.period !== currentReport.period) {
              return (
                <div key={index}>
                  <ReportCard
                    report={report}
                    deadline={getGracePeriodDeadline(report.period, currentSite)}
                  />
                </div>
              )
            }
          })}
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(FinancialSummaries);
