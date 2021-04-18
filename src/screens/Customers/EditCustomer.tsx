import React from 'react';
import { List } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
<<<<<<< HEAD
import { EMPTY_CUSTOMER } from '../../lib/redux/customerDataSlice';
=======
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import { updateCustomer } from '../../lib/airtable/request';
import { CustomerRecord, CustomerUpdateRecord } from '../../lib/airtable/interface';
import { formatDateStringToLocal } from '../../lib/moment/momentUtils';
import { EMPTY_CUSTOMER, setCurrentCustomerId } from '../../lib/redux/customerDataSlice';
import { selectAllTariffPlansArray } from '../../lib/redux/siteDataSlice';
import { selectCurrentUserId } from '../../lib/redux/userData';
>>>>>>> 9b737503b3ce761b28ffe1b31029526be41ce1a2
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import ListItemWrapper from '../../components/ListItemWrapper';
import { getTariffPlanByCustomer } from '../../lib/utils/customerUtils';

function EditCustomer() {
  const currentCustomer = useSelector(selectCurrentCustomer) || EMPTY_CUSTOMER;
  const history = useHistory();
  const tariffPlan = getTariffPlanByCustomer(currentCustomer);

  if (currentCustomer === EMPTY_CUSTOMER) {
    return <Redirect to='/customers' />
  }

  return (
    <BaseScreen title="Edit Customer" leftIcon="backNav">
      <List>
        <ListItemWrapper linkTo={`${history.location.pathname}/information`} leftText='Customer Information' divider />
        <ListItemWrapper linkTo='/profile/site/tariff-plans' leftText='Tariff Plan' rightText={tariffPlan?.name} divider />
        <ListItemWrapper linkTo='/profile/site/user-information' leftText='Meter' divider />
      </List>
    </BaseScreen>
  );
}

export default EditCustomer;
