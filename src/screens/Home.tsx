import { createStyles, FormControl, FormHelperText, MenuItem, Select, Theme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getAllSites } from '../utils/airtable/requests';
import Menu from '../components/HamburgerMenu';
import { SiteRecord } from '../utils/airtable/interface';
import FinancialSumCard from '../components/FinancialSumCard';
import HomeInfoCard from '../components/HomeInfo';
import { mockComponent } from 'react-dom/test-utils';
import useStyles from '../styles/HomeInfoStyles';


const styles = (theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 'auto',
      marginRight: 'auto',
      top: '90.09px',
    },
  });

interface HomeProps {
  classes: { header: string };
}

function Home(props: HomeProps) {
  useEffect(() => {
    getSites();
  }, []);

  const { classes } = props;
  const [sites, setSites] = useState<SiteRecord[]>([]);
  const [selectedSite, setSelectedSite] = useState<SiteRecord>();

  const getSites = async () => {
    const sites: SiteRecord[] = await getAllSites();
    console.log(sites);
    setSites(sites);
    setSelectedSite(sites[0]);
  };

  const renderSites = () => {
    return <HomeInfoCard customer={'0'} payment={'0'} unpaid={'1'} incidents={'0'} />;
  };

  const renderMenuOptions = () => {
    const siteData: Array<SiteRecord> | null = sites;
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

  return (
    <div>
      <div className={classes.header}>
        <FormControl>
          <Select inputProps={{ 'aria-label': 'Without label' }}>{renderMenuOptions()}</Select>
        </FormControl>
      </div>
      {renderSites()}
      <FinancialSumCard />
    </div>
  );
}

export default withStyles(styles)(Home);
