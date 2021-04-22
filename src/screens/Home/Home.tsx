import { createStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import Snackbar from '../../components/Snackbar';
import { SiteRecord } from '../../lib/airtable/interface';
import { formatDateStringToLocal } from '../../lib/moment/momentUtils';
import { selectCustomersToCollect, selectCustomersToMeter } from '../../lib/redux/customerData';
import { selectAllSitesInformation, selectCurrentSiteInformation } from '../../lib/redux/siteData';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { store } from '../../lib/redux/store';
import { selectIsOnline, selectLastUpdated } from '../../lib/redux/userData';
import { setIsOnline } from '../../lib/redux/userDataSlice';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';

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
          {isOnline ? <WifiIcon color="primary" /> : <WifiOffIcon color="secondary" />}
          <Typography className={classes.network} variant="body1">
            Last Connected to Network <br />
            {lastUpdated}
          </Typography>
        </div>
      </div>

      <Link to={'/customers'}>
        <HomeMenuItem
          label="Customer Alerts"
          amount={numCustomersToMeter + numCustomersToCollect}
          sublabels={[
            { amount: numCustomersToMeter, label: 'Number of customers to meter' },
            { amount: numCustomersToCollect, label: 'Number of customers to collect' },
          ]}
        />
      </Link>
      {/* TODO @wangannie remove before merging */}
      <Button label="Go offline" fullWidth onClick={() => store.dispatch(setIsOnline(!isOnline))} />
      <Link to={'/financial-summary'}>
        <HomeMenuItem label="Unpaid Reports" amount={0} />
      </Link>
      <HomeMenuItem label="Unresolved Incidents" amount={0} />
      <Link to={'/financial-summary'}>
        <HomeMenuItem label="Financial Summary" noBadge={true} />
      </Link>
      <Snackbar message="You are currently disconnected. Payments will be uploaded after you reconnect." />
    </BaseScreen>
  );
}


export default withStyles(styles)(Home);
