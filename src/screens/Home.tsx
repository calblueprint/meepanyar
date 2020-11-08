import { FormControl, FormHelperText, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { getAllSites } from '../utils/airtable/requests';
import Menu from '../components/HamburgerMenu';
import { SiteRecord } from '../utils/airtable/interface';
import FinancialSumCard from '../components/FinancialSumCard';
import HomeInfoCard from '../components/HomeInfo';
import { mockComponent } from 'react-dom/test-utils';
import * as Styles from '../styles/HomeInfoStyles';

interface HomeState {
  selectedSite: SiteRecord;
  sites: Array<SiteRecord>;
}

// let MockRecord: SiteRecord= {
//     name: "hi",
//     incidentIds: ['id'],
//     incidents: [],
//     inventoryIds: ['inventory'],
//     tariffPlanIds: ['plan'],
//     tariffPlans: [],
//     customerIds: ['custids'],
//     currentPeriod: 1,
//     financialReportIds: ['finreports'],
//     financialReports: [],
//     periodStartDate: 'April',
//     periodEndDate: 'May',
//     numNeedsReading: 3,
//     numCustomersNeedPay: 4,
//   }

class Home extends React.Component<{}, HomeState> {
  constructor(props: {}) {
    super(props);
    this.handleSiteChange = this.handleSiteChange.bind(this);
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
  //     let selectedSite = this.state.selectedSite;
  //     return (
  //         <HomeInfoCard
  //             customer={selectedSite.customer}
  //             payment={selectedSite.payment}
  //             unpaid={selectedSite.unpaid}
  //             incidents={selectedSite.incidents}
  //         />
  //     );
  // }

  handleSiteChange(newSite: SiteRecord) {
    this.setState({ selectedSite: newSite });
  }

  render() {
    const siteData = this.state.sites;
    return (
      <div>
        <Styles.Header>
          <FormControl>
            <Select inputProps={{ 'aria-label': 'Without label' }}>
              {siteData.map((site: SiteRecord) => (
                <MenuItem onClick={() => this.handleSiteChange(site)}>{site.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Styles.Header>

        <FinancialSumCard />
      </div>
    );
  }
}

export default Home;
