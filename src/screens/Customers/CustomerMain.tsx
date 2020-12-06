import React, { useEffect, useState } from 'react';
import { CustomerRecord } from '../../utils/airtable/interface';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../lib/redux/store';

interface CustomerProps {
  match: { url: string; }
  customers: CustomerRecord[];
}

function CustomerMain(props: CustomerProps) {
  return (
    <>
      {props.customers.map((customer, index) => (
        <Link key={index} to={{ pathname: `${props.match.url}/${customer.name}`, state: { customer: customer } }}>
          <h3>{customer.name}</h3>
        </Link>
      ))}
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  let customers = state.siteData.currentSite.customers;
  return { customers };
};

export default connect(mapStateToProps)(CustomerMain);
