import { List, ListItemText, ListItem } from '@material-ui/core';
import TariffPlanCard from './components/TariffPlanCard';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { useSelector } from 'react-redux';
import { selectAllTariffPlansArray } from '../../lib/redux/siteDataSlice';
import { TariffPlanRecord } from '../../lib/airtable/interface';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
import { useHistory } from 'react-router';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.primary.dark,
      paddingBottom: 0
    },
  }));

function TariffPlans() {
  const intl = useInternationalization();
  const classes = styles();
  const history = useHistory();

  // TODO: Add customer looking for tariff plans and render tariff plans without customers separately
  const tariffPlans: TariffPlanRecord[] = useSelector(selectAllTariffPlansArray) || [];

  const usedTariffPlans = tariffPlans.filter((tariffPlan: TariffPlanRecord) => tariffPlan.numberOfCustomers > 0);
  const unusedTariffPlans = tariffPlans.filter((tariffPlan: TariffPlanRecord) => tariffPlan.numberOfCustomers === 0);

  return (
    <BaseScreen title={intl(words.tariff_plan)} leftIcon="backNav">
      <BaseScrollView>
        <List style={{ padding: 0 }}>
          <ListItem disableGutters>
            <ListItemText primary={intl(words.used)} primaryTypographyProps={{ color: 'inherit' }} className={classes.header} />
          </ListItem>
          {usedTariffPlans.map((tariffPlan: TariffPlanRecord) =>
            <TariffPlanCard
              key={tariffPlan.id}
              tariffPlan={tariffPlan}
              handleTariffPlanClick={() => history.push(`${history.location.pathname}/tariff-plan`, { tariffPlan })}
              rightIcon={<ArrowForwardIosIcon fontSize='small' />}
            />)
          }
          <ListItem disableGutters>
            <ListItemText primary={intl(words.unused)} className={classes.header} />
          </ListItem>
          {unusedTariffPlans.map((tariffPlan: TariffPlanRecord) =>
            <TariffPlanCard
              key={tariffPlan.id}
              tariffPlan={tariffPlan}
              handleTariffPlanClick={() => history.push(`${history.location.pathname}/tariff-plan`, { tariffPlan })}
              rightIcon={<ArrowForwardIosIcon fontSize='small' />}
            />)
          }
        </List>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default TariffPlans;
