import { List } from '@material-ui/core';
import TariffPlanCard from '../Profile/components/TariffPlanCard';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { useSelector } from 'react-redux';
import { selectAllTariffPlansArray } from '../../lib/redux/siteDataSlice';
import { TariffPlanRecord } from '../../lib/airtable/interface';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import { Redirect } from 'react-router';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import CheckIcon from '@material-ui/icons/Check';
import Button from '../../components/Button';


const styles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.primary.dark,
      paddingBottom: 0
    },
  }));

function EditCustomerTariffPlans() {
  const customer = useSelector(selectCurrentCustomer);
  const [tariffPlanId, setTariffPlanId] = useState(customer?.tariffPlanId);
  const [loading, setLoading] = useState(false);
  const tariffPlans: TariffPlanRecord[] = useSelector(selectAllTariffPlansArray) || [];

  if (!customer) {
    return <Redirect to='/customers' />
  }

  // TODO: Add customer looking for tariff plans and render tariff plans without customers separately
  const availableTariffPlans = tariffPlans.filter((plan) => plan.meterTypes && plan.meterTypes.includes(customer?.meterType));
  availableTariffPlans.sort(function (a, b) {
    return b.numberOfCustomers - a.numberOfCustomers;
  });

  const handleSubmit = (event: React.MouseEvent) => {
    setLoading(loading);
    console.log('Submit received, tariff plan selected: ', tariffPlanId)
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
              rightIcon={tariffPlan.id === tariffPlanId ? <CheckIcon fontSize='small' /> : undefined}
              divider
            />)}
        </List>
        <Button onClick={handleSubmit} label='Save' />
      </BaseScrollView>
    </BaseScreen>
  );
}

export default EditCustomerTariffPlans;