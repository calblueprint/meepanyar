import { List } from '@material-ui/core';
import TariffPlanCard from '../Profile/components/TariffPlanCard';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { useSelector } from 'react-redux';
import { selectAllTariffPlansArray } from '../../lib/redux/siteDataSlice';
import { TariffPlanRecord } from '../../lib/airtable/interface';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import { Redirect, RouteComponentProps, useHistory } from 'react-router';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import CheckIcon from '@material-ui/icons/Check';
import Button from '../../components/Button';
import { updateCustomer } from '../../lib/airtable/request';


interface EditCustomerTariffPlansProps extends RouteComponentProps {
  location: any;
}

// The User can navigate to this screen directly from EditCustomer, or from EditCustomerMeter.
// If the user comes from EditCustomerMeter, they pass the meterType and meterNumber selected from the previous screen.
function EditCustomerTariffPlans(props: EditCustomerTariffPlansProps) {

  const customer = useSelector(selectCurrentCustomer);
  const history = useHistory();
  const [tariffPlanId, setTariffPlanId] = useState(customer?.tariffPlanId);
  const [loading, setLoading] = useState(false);
  const tariffPlans: TariffPlanRecord[] = useSelector(selectAllTariffPlansArray) || [];
  const goBack = props.location.state?.goBack || -1;

  if (!customer) {
    return <Redirect to='/customers' />
  }

  const meterType = props.location.state?.meterType || customer?.meterType;

  let meterNumber: string | null;
  if (props.location.state?.meterNumber !== undefined) {
    meterNumber = props.location.state?.meterNumber;
  } else {
    meterNumber = customer?.meterNumber ? customer?.meterNumber.toString() : null;
  }

  const availableTariffPlans = tariffPlans.filter((plan) => plan.meterTypes && plan.meterTypes.includes(meterType));
  availableTariffPlans.sort(function (a, b) {
    return b.numberOfCustomers - a.numberOfCustomers;
  });

  // Reset the tariffPlanId if the tariffPlanId is no longer in the an available tariff plan 
  // which can happen if the user changed the meterType in the EditCustomerMeter screen
  if (tariffPlanId && availableTariffPlans.filter(plan => plan.id === tariffPlanId).length === 0) {
    setTariffPlanId('')
  }

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(loading);

    const customerUpdate = {
      tariffPlanId,
      meterType,
      meterNumber: meterNumber ? parseInt(meterNumber) : null
    }

    updateCustomer(customer.id, customerUpdate, {}).then(() => history.go(goBack));
  }

  return (
    <BaseScreen title="Tariff Plans" leftIcon="backNav">
      <BaseScrollView>
        <List>
          {availableTariffPlans.map((tariffPlan: TariffPlanRecord) =>
            <TariffPlanCard
              key={tariffPlan.id}
              handleTariffPlanClick={() => setTariffPlanId(tariffPlan.id)}
              tariffPlan={tariffPlan}
              rightIcon={tariffPlan.id === tariffPlanId ? <CheckIcon fontSize='small' color='primary' /> : undefined}
              divider
            />)}
        </List>
        <Button onClick={handleSubmit} label='Save' loading={loading} />
      </BaseScrollView>
    </BaseScreen>
  );
}

export default EditCustomerTariffPlans;