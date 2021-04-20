import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { EMPTY_CUSTOMER } from '../../lib/redux/customerDataSlice';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import { selectAllCustomersArray } from '../../lib/redux/customerDataSlice';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { Switch, Typography } from '@material-ui/core';
import { updateCustomer } from '../../lib/airtable/request';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditCustomerInformation() {
  const currentCustomer = useSelector(selectCurrentCustomer) || EMPTY_CUSTOMER;
  const allCustomerNumbers = useSelector(selectAllCustomersArray).map(customer => customer.customerNumber);
  const history = useHistory();
  const [loading, setLoading] = useState(false);


  const validationSchema = yup.object({
    customerName: yup.string().required('Please enter a name'),
    customerNumber: yup.number()
      .min(0, 'Please enter a positive number')
      .notOneOf(allCustomerNumbers, 'That customer number is used by another customer')
      .required('Please enter a customer number'),
    activeStatus: yup.bool(),
  });

  const formik = useFormik({
    initialValues: {
      customerName: currentCustomer.name,
      customerNumber: currentCustomer.customerNumber.toString(),
      activeStatus: currentCustomer.isactive,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    }
  })

  if (currentCustomer === EMPTY_CUSTOMER) {
    return <Redirect to='/customers' />
  }

  const handleSubmit = (values: any) => {
    const { customerNumber, customerName, activeStatus } = values;
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
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          label={'Name'}
          id={'customerName'}
          value={formik.values.customerName}
          required
          error={formik.touched.customerName && Boolean(formik.errors.customerName)}
          helperText={formik.touched.customerName && formik.errors.customerName}
          onChange={formik.handleChange}
        />
        <TextField
          label={'Customer Number'}
          id={'customerNumber'}
          value={formik.values.customerNumber}
          required
          type='number'
          error={formik.touched.customerNumber && Boolean(formik.errors.customerNumber)}
          helperText={formik.touched.customerNumber && formik.errors.customerNumber}
          onChange={formik.handleChange}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography style={{ flex: 1 }}> Active Status </Typography>
          <Switch
            edge='end'
            onChange={formik.handleChange}
            checked={formik.values.activeStatus}
            id={'activeStatus'}
            color='primary'
          />
        </div>
        <Button label={'Save'} loading={loading} />
      </form>
    </BaseScreen>
  );
}

export default EditCustomerInformation;
