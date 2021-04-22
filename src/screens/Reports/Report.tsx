import React from 'react';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';
import { useSelector } from 'react-redux';

const styles = (theme: Theme) =>
  createStyles({
  });

interface ReportProps extends RouteComponentProps {
  classes: { };
  report: FinancialSummaryRecord;
  location: any;
}

function Report(props: ReportProps) {
  const { classes, match } = props;
  const report = props.location.state;
  const currentSite = useSelector(selectCurrentSiteInformation);

  return (
    <BaseScreen leftIcon="backNav" title="Reports" rightIcon="profile" match={match}>
      <Typography variant="h1">{report.period}</Typography>
      <Typography color="textSecondary">{currentSite.name}</Typography>
      <BaseScrollView>
        <Typography>report</Typography>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(Report);
