import { FormControl, FormHelperText, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { getAllSites } from '../utils/airtable/requests';
import Menu from '../components/HamburgerMenu';
import { SiteRecord } from '../utils/airtable/interface';
import FinancialSumCard from '../components/FinancialSumCard';
import HomeInfoCard from '../components/HomeInfo';
import { mockComponent } from 'react-dom/test-utils';
import useStyles from '../styles/HomeInfoStyles';

interface HomeState {
  selectedSite: SiteRecord | null;
  sites: Array<SiteRecord> | null;
}

class Home extends React.Component<{}, HomeState> {
  constructor(props: {}) {
    super(props);
    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.state = {
      selectedSite: null,
      sites: null,
    };
  }

  async getSites() {
    const sites: SiteRecord[] = await getAllSites();
    console.log(sites);
    this.setState({
      selectedSite: sites[0],
      sites: sites,
    });
  }

  componentDidMount() {
    this.getSites();
  }

  // renderSite() {
  //   const selectedSite = this.state.selectedSite;
  //   if (selectedSite) {
  //     return (
  //       <HomeInfoCard
  //         customer={selectedSite.customer}
  //         payment={selectedSite.payment}
  //         unpaid={selectedSite.unpaid}
  //         incidents={selectedSite.incidents}
  //       />
  //     );
  //   }
  // }

  renderMenuOptions() {
    const siteData: Array<SiteRecord> | null = this.state.sites;
    if (siteData) {
      return siteData.map((site: SiteRecord) => (
        <MenuItem onClick={() => this.handleSiteChange(site)} key={site.name}>
          {site.name}
        </MenuItem>
      ));
    }
  }

  handleSiteChange(newSite: SiteRecord) {
    this.setState({ selectedSite: newSite });
  }

  render() {
    const classes = useStyles();
    return (
      <div>
        <div className={classes.header}>
          <FormControl>
            <Select inputProps={{ 'aria-label': 'Without label' }}>{this.renderMenuOptions()}</Select>
          </FormControl>
        </div>

        <FinancialSumCard />
      </div>
    );
  }
}

export default Home;
