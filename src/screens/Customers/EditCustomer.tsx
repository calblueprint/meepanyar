import React from 'react';
import { List } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { EMPTY_CUSTOMER } from '../../lib/redux/customerDataSlice';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import ListItemWrapper from '../../components/ListItemWrapper';
import { getTariffPlanByCustomer } from '../../lib/utils/customerUtils';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

function EditCustomer() {
  const intl = useInternationalization(); 
  const currentCustomer = useSelector(selectCurrentCustomer) || EMPTY_CUSTOMER;
  const history = useHistory();
  const tariffPlan = getTariffPlanByCustomer(currentCustomer);

  if (currentCustomer === EMPTY_CUSTOMER) {
    return <Redirect to='/customers' />
  }

  return (
    <BaseScreen title={intl(words.edit_customer)} leftIcon="backNav">
      <List>
        <ListItemWrapper linkTo={`${history.location.pathname}/information`} leftText={intl(words.customer_information)} divider />
        <ListItemWrapper linkTo={`${history.location.pathname}/tariff-plans`} leftText={intl(words.tariff_plan)} rightText={tariffPlan?.name} divider />
        <ListItemWrapper linkTo={`${history.location.pathname}/meter`} leftText={intl(words.meter)} divider />
      </List>
    </BaseScreen>
  );
}

export default EditCustomer;
