import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { EMPTY_CUSTOMER } from '../../lib/redux/customerDataSlice';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { Switch, Typography } from '@material-ui/core';
import { updateCustomer } from '../../lib/airtable/request';

function EditCustomerInformation() {
  const currentCustomer = useSelector(selectCurrentCustomer) || EMPTY_CUSTOMER;
  const history = useHistory();

  const [customerName, setCustomerName] = useState(currentCustomer.name);
  const [customerNumber, setCustomerNumber] = useState(currentCustomer.customerNumber.toString());
  const [activeStatus, setActiveStatus] = useState(currentCustomer.isactive);
  const [loading, setLoading] = useState(false);

  if (currentCustomer === EMPTY_CUSTOMER) {
    return <Redirect to='/customers' />
  }

  const handleCustomerNameInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCustomerName(event.target.value as string);
  };

  const handleCustomerNumberInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCustomerNumber(event.target.value as string);
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);

    const customerUpdates = {
      customerNumber: parseInt(customerNumber),
      name: customerName,
      isactive: activeStatus,
    }

    updateCustomer(currentCustomer.id, customerUpdates, {}).then(history.goBack);
  }

  return (
    <BaseScreen title="Customer Information" leftIcon="backNav">
      <TextField label={'Name'} id={'name'} value={customerName} onChange={handleCustomerNameInput} />
      <TextField label={'Customer Number'} id={'customer-number'} value={customerNumber} onChange={handleCustomerNumberInput} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography style={{ flex: 1 }}> Active Status </Typography>
        <Switch edge='end' onClick={() => setActiveStatus(!activeStatus)} checked={activeStatus} color='primary' />
      </div>
      <Button label={'Save'} onClick={handleSubmit} loading={loading} />
    </BaseScreen>
  );
}

export default EditCustomerInformation;
