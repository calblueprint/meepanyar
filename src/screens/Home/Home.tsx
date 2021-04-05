import React from 'react';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { formatDateStringToLocal } from '../../lib/moment/momentUtils';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { SiteRecord } from '../../lib/airtable/interface';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';

import Typography from '@material-ui/core/Typography';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { selectCustomersToMeter, selectCustomersToCollect } from '../../lib/redux/customerData';

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
  lastUpdated: string;
  isOnline: boolean;
  currentSite: SiteRecord;
}

function Home(props: HomeProps) {
  const { classes, lastUpdated, isOnline, currentSite } = props;
  const numCustomersToMeter  = useSelector(selectCustomersToMeter)?.length || 0;
  const numCustomersToCollect = useSelector(selectCustomersToCollect)?.length || 0;
  const numOutstandingPayments = 0;

  return (
    <BaseScreen rightIcon="user">
      <div className={classes.header}>
        <SiteMenu currentSite={currentSite} />
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
          amount={numCustomersToMeter + numOutstandingPayments}
          sublabels={[
            { amount: numCustomersToMeter, label: 'Number of customers to meter' },
            { amount: numCustomersToCollect, label: 'Number of customers to collect' },
          ]}
        />
      </Link>
      <Link to={'/financial-summary'}>
        <HomeMenuItem label="Unpaid Reports" amount={0} />
      </Link>
      <HomeMenuItem label="Unresolved Incidents" amount={0} />
      <Link to={'/financial-summary'}>
        <HomeMenuItem label="Financial Summary" noBadge={true} />
      </Link>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => {
  let lastUpdated = '';

  if (state.userData.lastUpdated) {
    lastUpdated = formatDateStringToLocal(state.userData.lastUpdated);
  }
  const isOnline = state.userData.isOnline;
  const currentSite = state.siteData.currentSite;

  return { lastUpdated, isOnline, currentSite };
};

export default connect(mapStateToProps)(withStyles(styles)(Home));
