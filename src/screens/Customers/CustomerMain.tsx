import React, { useEffect, useState } from 'react';
import { CustomerRecord } from '../../utils/airtable/interface';
import { getAllCustomers } from '../../utils/airtable/requests';
import { Link, RouteComponentProps } from 'react-router-dom';

function CustomerMain(props: RouteComponentProps) {
  useEffect(() => {
    getCustomers();
  }, []);

  const [customers, setCustomers] = useState<CustomerRecord[]>([]);

  const getCustomers = async () => {
    const customers: CustomerRecord[] = await getAllCustomers();
    setCustomers(customers);
  };

  return (
    <>
      {customers.map((customer, index) => (
        <Link key={index} to={{ pathname: `${props.match.url}/${customer.name}`, state: { customer: customer } }}>
          <h3>{customer.name}</h3>
        </Link>
      ))}
    </>
  );
}

export default CustomerMain;
