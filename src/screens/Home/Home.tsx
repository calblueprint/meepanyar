import React from 'react';
import { formatDateStringToLocal, getCurrentPeriod, getNextPeriod } from '../../lib/moment/momentUtils';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SiteRecord } from '../../lib/airtable/interface';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';
import ReportButton from './components/ReportButton';
import PastReportButton from './components/PastReportsButton';
import PaymentButton from './components/PaymentButton';


import Typography from '@material-ui/core/Typography';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import CloudIcon from '@material-ui/icons/Cloud';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { selectCustomersToMeter, selectCustomersToCollect } from '../../lib/redux/customerData';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { selectAllSitesInformation, selectCurrentSiteInformation } from '../../lib/redux/siteData';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { selectIsOnline, selectLastUpdated } from '../../lib/redux/userData';

const styles = (theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '35px',
    },
    network: {
      color: theme.palette.error.light,
      textAlign: 'right',
      width: '100px',
      fontSize: theme.typography.caption.fontSize,
    },
    periodDescription: {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.error.main,
    },
    categoryText: {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.error.dark,
    },
    financialSums: {
      display: 'flex',
      justifyContent: 'space-between',
    },

  });

interface HomeProps {
  classes: { header: string; network: string, periodDescription: string, categoryText: string, financialSums: string; };
}

function Home(props: HomeProps) {
  const { classes } = props;
  const numCustomersToMeter = useSelector(selectCustomersToMeter)?.length || 0;
  const numCustomersToCollect = useSelector(selectCustomersToCollect)?.length || 0;
  const allSites: SiteRecord[] = useSelector(selectAllSitesInformation) || [];
  const currentSite: SiteRecord = useSelector(selectCurrentSiteInformation) || EMPTY_SITE;
  const isOnline = useSelector(selectIsOnline);
  const lastUpdated = formatDateStringToLocal(useSelector(selectLastUpdated));

  return (
    <BaseScreen rightIcon="user">
      <BaseScrollView>
        <div className={classes.header}>
          <div>
            <SiteMenu currentSite={currentSite} sites={allSites} />
            <Typography className={classes.periodDescription} >
              Current Period: {getCurrentPeriod()}
            </Typography>
            <Typography className={classes.periodDescription} >
              Deadline: {getNextPeriod()}
            </Typography>
          </div>
          <div className={classes.network}>
            {isOnline ? <CloudIcon color="primary" /> : <CloudOffIcon color="disabled" />}
            <Typography className={classes.network} variant="body1">
              Last Connected to Network <br />
              {lastUpdated}
            </Typography>
          </div>
        </div>

        <PaymentButton />
        <Typography className={classes.categoryText}>
          Tasks
      </Typography>
        <Link to={'/customers'}>
          <HomeMenuItem
            label="To Meter"
            amount={numCustomersToMeter}
            iconType="meter"
          />
        </Link>
        <Link to={'/customers'}>
          <HomeMenuItem
            label="To Collect"
            amount={numCustomersToCollect}
            iconType="collect"
          />
        </Link>
        <Link to={'/maintenance'}>
          <HomeMenuItem
            label="Maintenance"
            amount={0}
            iconType="maintenance"
          />
        </Link>
        <HomeMenuItem label="Incidents" amount={0} iconType="incident" />
        <Typography className={classes.categoryText}>
          Financial Reports
      </Typography>
        <div className={classes.financialSums}>
          <Link to={'/financial-summary'}>
            <ReportButton />
          </Link>
          <Link to={'/financial-summary'}>
            <PastReportButton />
          </Link>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}


export default withStyles(styles)(Home);
