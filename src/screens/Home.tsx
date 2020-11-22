import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../lib/redux/store';
import { formatUTCDateStringToLocal } from '../lib/moment/momentUtils';
import { getAllSites, getAllTariffPlans } from '../utils/new-schema/request';

interface HomeProps {
  lastUpdated: string;
  isOnline: boolean;
}

interface HomeState {
  sites: any[];
  tariffPlans: any[];
}

class Home extends React.Component<HomeProps, HomeState> {
  state = {
    sites: [],
    tariffPlans: [],
  };

  public componentDidMount() {
    this.getSiteData();
    this.getTariffPlans();
  }

  getCustomerName = () => {
    return 'Julian Kung';
  };

  submitCustomer = async (): Promise<void> => {
    const customerName = this.getCustomerName();
  };

  getTariffPlans = async () => {
    const allTariffPlans = await getAllTariffPlans();
    console.log(allTariffPlans);

    this.setState({ tariffPlans: allTariffPlans });
  };

  getSiteData = async () => {
    const allSiteData = await getAllSites();
    console.log(allSiteData);

    this.setState({ sites: allSiteData });
  };

  render() {
    const { sites, tariffPlans } = this.state;
    return (
      <>
        <button onClick={this.submitCustomer}>Create a customer</button>
        <button>Create an invoice for customer</button>
        <h4>
          {JSON.stringify(tariffPlans)}
          This is the home screen
          <p> User data last updated on: {this.props.lastUpdated}</p>
          {!this.props.isOnline ? <p>Offline</p> : null}
          {JSON.stringify(sites)}
        </h4>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let lastUpdated = '';

  if (state.userData.lastUpdated) {
    lastUpdated = formatUTCDateStringToLocal(state.userData.lastUpdated);
  }
  const isOnline = state.userData.isOnline;
  return { lastUpdated, isOnline };
};

export default connect(mapStateToProps)(Home);
