import { createStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { SiteRecord } from '../../lib/airtable/interface';
import { formatDateStringToLocal } from '../../lib/moment/momentUtils';
import { selectCustomersToCollect, selectCustomersToMeter } from '../../lib/redux/customerData';
import { selectAllSitesInformation, selectCurrentSiteInformation } from '../../lib/redux/siteData';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { selectIsOnline, selectLastUpdated } from '../../lib/redux/userData';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

const styles = () =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '35px',
    },
    network: {
      color: '#BDBDBD',
      textAlign: 'right',
      width: '100px',
    },
  });

interface HomeProps {
  classes: { header: string; network: string };
}

function Home(props: HomeProps) {
  const intl = useInternationalization(); 
  const { classes } = props;
  const numCustomersToMeter = useSelector(selectCustomersToMeter)?.length || 0;
  const numCustomersToCollect = useSelector(selectCustomersToCollect)?.length || 0;
  const allSites: SiteRecord[] = useSelector(selectAllSitesInformation) || [];
  const currentSite: SiteRecord = useSelector(selectCurrentSiteInformation) || EMPTY_SITE;
  const isOnline = useSelector(selectIsOnline) || false;
  const lastUpdated = formatDateStringToLocal(useSelector(selectLastUpdated));

  return (
    <BaseScreen rightIcon="user">
      <div className={classes.header}>
        <SiteMenu currentSite={currentSite} sites={allSites} />
        <div className={classes.network}>
          {isOnline ? <CloudQueueIcon color="primary" /> : <CloudOffIcon color="secondary" />}
          <Typography className={classes.network} variant="body1">
            {intl(words.last_connected_to_network)} <br />
            {lastUpdated}
          </Typography>
        </div>
      </div>

      <Link to={'/customers'}>
        <HomeMenuItem
          label="Customer Alerts"
          amount={numCustomersToMeter + numCustomersToCollect}
          sublabels={[
            { amount: numCustomersToMeter, label: intl(words.number_of_customers_to_meter) },
            { amount: numCustomersToCollect, label: intl(words.number_of_customers_to_collect) },
          ]}
        />
      </Link>
      <Link to={'/financial-summary'}>
        <HomeMenuItem label={`${intl(words.unpaid)} ${intl(words.reports)}`} amount={0} />
      </Link>
      <HomeMenuItem label={intl(words.unresolved_incidents)} amount={0} />
      <Link to={'/financial-summary'}>
        <HomeMenuItem label={intl(words.financial_summary)} noBadge={true} />
      </Link>
    </BaseScreen>
  );
}


export default withStyles(styles)(Home);
