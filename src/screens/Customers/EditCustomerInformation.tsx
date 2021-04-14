import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { EMPTY_CUSTOMER } from '../../lib/redux/customerDataSlice';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

function EditCustomerInformation() {
  const currentCustomer = useSelector(selectCurrentCustomer) || EMPTY_CUSTOMER;

  const [newName, setNewName] = useState(currentCustomer.name);
  const [newCustomerNumber, setNewCustomerNumber] = useState('10');

  if (currentCustomer === EMPTY_CUSTOMER) {
    return <Redirect to='/customers' />
  }

  const handleNameInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewName(event.target.value as string);
  };

  const handleCustomerNumberInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewCustomerNumber(event.target.value as string);
  };

  const handleSubmit = (event: React.MouseEvent) => {
      event.preventDefault();
      console.log(newName, newCustomerNumber);
  }

  return (
    <BaseScreen title="Customer Information" leftIcon="backNav">
        <TextField label={'Name'} id={'name'} value={newName} onChange={handleNameInput} />
        <TextField label={'Customer Number'} id={'customer-number'} value={newCustomerNumber} onChange={handleCustomerNumberInput} />
        <Button label={'Save'} onClick={handleSubmit} />
    </BaseScreen>
  );
}

export default EditCustomerInformation;
