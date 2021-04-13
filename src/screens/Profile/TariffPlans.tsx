import { List, ListItemText, ListItem } from '@material-ui/core';
import TariffPlanCard from './components/TariffPlanCard';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { useSelector } from 'react-redux';
import { selectAllTariffPlansArray } from '../../lib/redux/siteDataSlice';
import { TariffPlanRecord } from '../../lib/airtable/interface';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.primary.dark,
      paddingBottom: 0
    },
  }));

function TariffPlans() {
  const classes = styles();

  // TODO: Add customer looking for tariff plans and render tariff plans without customers separately
  const tariffPlans: TariffPlanRecord[] = useSelector(selectAllTariffPlansArray) || [];

  return (
    <BaseScreen title="Tariff Plans" leftIcon="backNav">
      <List style={{ padding: 0 }}>
        <ListItem disableGutters>
          <ListItemText primary='Used' primaryTypographyProps={{ color: 'inherit' }} className={classes.header} />
        </ListItem>
        {tariffPlans.map((tariffPlan: TariffPlanRecord) => <TariffPlanCard key={tariffPlan.id} tariffPlan={tariffPlan} />)}
        <ListItem disableGutters>
          <ListItemText primary='Unused' className={classes.header} />
        </ListItem>
      </List>
    </BaseScreen>
  );
}

export default TariffPlans;