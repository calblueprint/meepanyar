import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../lib/redux/store';
import { formatUTCDateStringToLocal } from '../lib/moment/momentUtils';
import { getAllSites, getAllTariffPlans } from '../utils/new-schema/request';
import { createCustomer, createMeterReadingsandInvoice } from '../lib/airtable/airtable';

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

  public async componentDidMount() {
    await this.getSiteData();
    await this.getTariffPlans();
  }

  getCustomerName = () => {
    return 'Julian Kung';
  };

  getSite = () => {
    return 'recdokHLQX8zCHofF';
  };

  getTariffPlan = () => {
    return 'recOpsFHSM2pwaLXI';
  };

  getMeterNumber = () => {
    return 2323;
  };

  createCustomer = async (): Promise<void> => {
    const customerName = this.getCustomerName();
    const siteId = this.getSite();
    const meterNumber = this.getMeterNumber();
    const tariffPlanId = this.getTariffPlan();

    const customerData = { customerName, siteId, tariffPlanId, meterNumber };
    createCustomer(customerData);
  };

  createMeterReading = async (): Promise<void> => {
    const customerName = this.getCustomerName();
    const siteId = this.getSite();
    const meterNumber = this.getMeterNumber();
    const tariffPlanId = this.getTariffPlan();

    const customerData = { customerName, siteId, tariffPlanId, meterNumber };
    const meterReading = { reading: 10, meterNumber: 10 };
    createMeterReadingsandInvoice(customerData, meterReading);
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
        <button onClick={this.createCustomer}>Create a customer</button>
        <button onClick={this.createMeterReading}>Create an invoice for customer</button>
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
