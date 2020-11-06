import React, { useEffect, useState } from 'react';
import { CustomerRecord } from '../../utils/airtable/interface';
import { getAllCustomers } from '../../utils/airtable/requests';
import { Link } from 'react-router-dom';

interface CustomerMainProps {
  match: any;
}

function CustomerMain(props: CustomerMainProps) {
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
      {customers.map((customer) => (
        <Link to={{ pathname: `${props.match.url}/${customer.name}`, state: { customer: customer } }}>
          <h3>{customer.name}</h3>
        </Link>
      ))}
    </>
  );
}

export default CustomerMain;
