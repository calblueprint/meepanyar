import { ListItemText, ListItem, Typography, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { TariffPlanRecord } from '../../../lib/airtable/interface';
import { useHistory } from 'react-router';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      color: theme.palette.text.disabled
    },
    iconStyles: {
      paddingRight: 0
    },
  }));

interface TariffPlanProps {
  tariffPlan: TariffPlanRecord;
  readOnly?: boolean;
}

function TariffPlanCard(props: TariffPlanProps) {
  const classes = styles(props);
  const history = useHistory();
  const { tariffPlan } = props;

  const handleTariffPlanClick =
    (tariffPlan: TariffPlanRecord) => () => history.push(`${history.location.pathname}/tariff-plan`, { tariffPlan })

  const getTariffPlanDescription = (tariffPlan: TariffPlanRecord) => (
    <div className={classes.description}>
      <Typography variant='body2'>
        {/* Right now just hardcoding. We need to add a lookup field to Tariff Plans for this */}
        Customers: --
      </Typography>
      <Typography variant='body2'>
        Fixed Payment: {tariffPlan.fixedTariff} Ks
      </Typography>
      <Typography variant='body2'>
        Per Unit Payment: {tariffPlan.tariffByUnit} Ks
      </Typography>
      <Typography variant='body2'>
        Free Units:  {tariffPlan.freeUnits} Kwh
      </Typography>
    </div>)

  const getTariffPlanButton = () => (
    <ListItemSecondaryAction>
      <IconButton edge="end" className={classes.iconStyles}>
        <ArrowForwardIosIcon fontSize='small' />
      </IconButton>
    </ListItemSecondaryAction>
  );

  return (
    <ListItem disableGutters button onClick={props.readOnly ? handleTariffPlanClick(tariffPlan) : undefined} alignItems='flex-start' dense>
      <ListItemText
        primary={tariffPlan.name}
        secondary={getTariffPlanDescription(tariffPlan)}
      />
      {props.readOnly && getTariffPlanButton()}
    </ListItem>
  );
}

export default TariffPlanCard;
