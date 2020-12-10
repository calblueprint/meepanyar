import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { formatUTCDateStringToLocal } from '../../lib/moment/momentUtils';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { SiteRecord } from '../../utils/airtable/interface';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';

import Typography from '@material-ui/core/Typography';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import BaseScreen from '../../components/BaseComponents/BaseScreen';

const styles = () =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '35px',
    },
    select: {
      color: '#828282',
      display: 'flex',
      alignItems: 'flex-end',
      width: '200px',
    },
    network: {
      color: '#BDBDBD',
      textAlign: 'right',
      width: '100px',
    },
  });

interface HomeProps {
  classes: any;
  lastUpdated: string;
  isOnline: boolean;
  currentSite: SiteRecord;
}

function Home(props: HomeProps) {
  const { classes, lastUpdated, isOnline, currentSite } = props;

  return (
    <BaseScreen rightIcon="user">
      <div className={classes.header}>
        <div className={classes.select}>
          <Typography variant="h1">
            {currentSite.name}
            <SiteMenu currentSite={currentSite} />
          </Typography>
        </div>
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
          amount={1}
          sublabels={[
            { amount: 1, label: 'Customers to Charge' },
            { amount: 2, label: 'Outstanding Payments' },
          ]}
        />
      </Link>
      <Link to={'/financialsummary'}>
        <HomeMenuItem label="Unpaid Reports" amount={1} />
      </Link>
      <HomeMenuItem label="Unresolved Incidents" amount={0} />
      <Link to={'/financialsummary'}>
        <HomeMenuItem label="Financial Summary" noBadge={true} />
      </Link>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => {
  let lastUpdated = '';

  if (state.userData.lastUpdated) {
    lastUpdated = formatUTCDateStringToLocal(state.userData.lastUpdated);
  }
  const isOnline = state.userData.isOnline;
  const currentSite = state.siteData.currentSite;

  return { lastUpdated, isOnline, currentSite };
};

export default connect(mapStateToProps)(withStyles(styles)(Home));
