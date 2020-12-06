import { createStyles, FormControl, FormHelperText, MenuItem, Select, Theme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getAllSites } from '../utils/airtable/requests';
import { CustomerRecord, SiteRecord } from '../utils/airtable/interface';
import FinancialSumCard from '../components/FinancialSumCard';
import HomeInfoCard from '../components/HomeInfo';
import { store } from '../lib/redux/store';
import { current } from '@reduxjs/toolkit';


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
    getSiteFromRedux();
  }, []);

  const { classes } = props;
  const [sites, setSites] = useState<SiteRecord[]>([]);
  const [selectedSite, setSelectedSite] = useState<SiteRecord>();
  const [outStandingPayments, setOutstandingPayments] = useState<number>();
  const [toCharge, setToCharges] = useState<number>();
  const [unpaidReports, setUnpaidReports] = useState<number>();

  const getSites = async () => {
    const sites: SiteRecord[] = await getAllSites();
    console.log(sites);
    setSites(sites);
    setSelectedSite(sites[0]);
  };

  const getSiteFromRedux = () => {
    let siteData = store.getState().siteData;
    let sites = siteData.sites;
    console.log(siteData);
    setSites(sites);
    setSelectedSite(siteData.currentSite);
    proccessData(siteData.currentSite)
  }

  const proccessData = (ss: SiteRecord) => {
    // customers to charge:  haven't charged yet/ no meterreading
    // outstanding payments: done the meter reading / charged, haven't paid yet
    let toCharge = 0;
    let outstanding = 0;
    //get day
    const today = new Date()
    const currMonth = today.getUTCMonth()
    let customers = ss.customers
    for (let i = 0; i < customers.length; i++) {
      let curr = customers[i]
      //depends if the meter readings list is sorted with earliest => latest
      let latestMeterReading = curr.meterReadings[curr.meterReadings.length - 1]
      const dateTime = Date.parse(latestMeterReading.date)
      let readingDate = new Date(dateTime)
      if (readingDate.getUTCMonth() < currMonth) {
        toCharge += 1;
      }
      if (checkPayment(curr)) {
        outstanding += 1;
      }
    }
    setOutstandingPayments(outstanding);
    setToCharges(toCharge);
    // console.log("outstanding")
    // console.log(outstanding)
    // console.log("tocahrge")
    // console.log(toCharge)
  }

  //true has outstadining false has paid
  const checkPayment = (customer: CustomerRecord) => {
    if (parseInt(customer.outstandingBalance) > 0) {
      return true;
    }
    return false;
  }


  const renderSites = () => {
    if (toCharge != null && outStandingPayments != null) {
      return <HomeInfoCard customer={toCharge.toString()} payment={outStandingPayments.toString()} unpaid={'0'} incidents={'0'} />;
    }
    return <HomeInfoCard customer={'0'} payment={'0'} unpaid={'0'} incidents={'0'} />;

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
    proccessData(newSite)
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
