import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../lib/redux/store';
import { formatUTCDateStringToLocal } from '../lib/moment/momentUtils';
import { getAllSites, getAllTariffPlans } from '../utils/new-schema/request';
import { createCustomer, createMeterReadingsandInvoice } from '../lib/airtable/airtable';
import moment from 'moment';
import { getUserId } from '../lib/redux/userData';

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
    return 'recoeD24hlQuSPCKQ';
  };

  getMeterNumber = () => {
    return 2323;
  };

  createCustomer = async (): Promise<void> => {
    const customerName = this.getCustomerName();
    const siteId = this.getSite();
    const meterNumber = this.getMeterNumber();
    const tariffPlanId = this.getTariffPlan();

    const customerData = {
      name: customerName,
      meterNumber: meterNumber,
      tariffPlansId: tariffPlanId,
      sitesId: siteId,
      meterReadings: [],
      payments: [],
      rid: 'recoNPk1l0vYoWxnx',
    };

    createCustomer(customerData);
  };

  createMeterReading = async (): Promise<void> => {
    const customerName = this.getCustomerName();
    const siteId = this.getSite();
    const meterNumber = this.getMeterNumber();
    const tariffPlanId = this.getTariffPlan();

    const customerData = {
      name: customerName,
      meterNumber: meterNumber,
      tariffPlansId: tariffPlanId,
      sitesId: siteId,
      meterReadings: [],
      payments: [],
      rid: 'recoNPk1l0vYoWxnx',
    };

    const meterReading = {
      reading: 10,
      meterNumber: 10,
      date: moment().format('YYYY-MM-DD'),
      amountBilled: 100,
      billedById: getUserId(),
    };
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
        <button onClick={this.createMeterReading}>Create a Meter Reading for customer</button>
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
  let isOnline = false;

  if (state.userData) {
    const userData = state.userData;

    if (userData.isOnline) {
      isOnline = userData.isOnline;
    }

    if (userData.lastUpdated) {
      lastUpdated = formatUTCDateStringToLocal(state.userData.lastUpdated);
    }
  }

  return { lastUpdated, isOnline };
};

export default connect(mapStateToProps)(Home);
