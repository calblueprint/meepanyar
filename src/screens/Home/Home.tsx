import { createStyles, MenuItem, Select, Theme, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { formatUTCDateStringToLocal } from '../../lib/moment/momentUtils';

import { SiteRecord } from '../../utils/airtable/interface';
import FinancialSumCard from './components/FinancialSumCard';
import HomeInfoCard from './components/HomeInfo';

import Typography from '@material-ui/core/Typography';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import BaseScreen from '../../components/BaseComponents/BaseScreen';

const styles = (theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '25px',
    },
    select: {
      color: '#828282',
      display: 'flex',
      alignItems: 'flex-end',
    },
    network: {
      color: '#BDBDBD',
      textAlign: 'right',
    },
  });

interface HomeProps {
  classes: any;
  lastUpdated: string;
  isOnline: boolean;
  currentSite: SiteRecord;
  sites: SiteRecord[];
}

function Home(props: HomeProps) {
  const { classes, lastUpdated, currentSite, sites } = props;
  const [selectedSite, setSelectedSite] = useState<SiteRecord>();

  const renderSites = () => {
    // if (toCharge != null && outStandingPayments != null) {
    //   return <HomeInfoCard customer={toCharge.toString()} payment={outStandingPayments.toString()} unpaid={'0'} incidents={'0'} />;
    // }
    return <HomeInfoCard customer={'0'} payment={'0'} unpaid={'0'} incidents={'0'} />;
  };

  const renderMenuOptions = () => {
    const siteData: SiteRecord[] | null = sites;
    if (siteData) {
      return siteData.map((site: SiteRecord) => (
        <MenuItem onClick={() => handleSiteChange(site)} key={site.name}>
          {site.name}
        </MenuItem>
      ));
    }
  };

  const handleSiteChange = (newSite: SiteRecord) => {
    setSelectedSite(newSite);
  };

  const getNetworkInfo = () => {
    return (
      <div className={classes.network}>
        <WifiOffIcon color="secondary" />
        <Typography className={classes.network} variant="body1">
          Last Connected to Network <br />
          {lastUpdated}
        </Typography>
      </div>
    );
  };

  return (
    <BaseScreen rightIcon="user">
      <div className={classes.header}>
        <div className={classes.select}>
          <Typography variant="h1">
            {currentSite.name}
            <Select>{renderMenuOptions()}</Select>
          </Typography>
        </div>
        {getNetworkInfo()}
      </div>
      {renderSites()}
      <FinancialSumCard />
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
  const sites = state.siteData.sites;

  return { lastUpdated, isOnline, currentSite, sites };
};

export default connect(mapStateToProps)(withStyles(styles)(Home));
