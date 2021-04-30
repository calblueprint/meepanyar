import { ListItemText, ListItem, Typography, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { TariffPlanRecord } from '../../../lib/airtable/interface';
import { useHistory } from 'react-router';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';

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
  divider?: boolean;
  rightIcon?: JSX.Element;
  handleTariffPlanClick?: () => void;
}

function TariffPlanCard(props: TariffPlanProps) {
  const intl = useInternationalization(); 
  const classes = styles(props);
  const { tariffPlan, divider, handleTariffPlanClick } = props;

  const getTariffPlanDescription = (tariffPlan: TariffPlanRecord) => (
    <div className={classes.description}>
      <Typography variant='body2'>
        {intl(words.customers)}: {tariffPlan.numberOfCustomers}
      </Typography>
      <Typography variant='body2'>
        {intl(words.fixed_payment)}: {tariffPlan.fixedTariff} {intl(words.ks)}
      </Typography>
      <Typography variant='body2'>
        {intl(words.per_unit_payment)}: {tariffPlan.tariffByUnit} {intl(words.ks)}
      </Typography>
      <Typography variant='body2'>
        {intl(words.free_units)}:  {tariffPlan.freeUnits} {intl(words.kwh)}
      </Typography>
    </div>)

  const formatRightIcon = () => (
    <ListItemSecondaryAction>
      <IconButton edge="end" className={classes.iconStyles} onClick={handleTariffPlanClick}>
        {props.rightIcon}
      </IconButton>
    </ListItemSecondaryAction>
  )

  return (
    <ListItem
      disableGutters
      button
      onClick={handleTariffPlanClick}
      divider={divider}
      alignItems='flex-start'
      dense
    >
      <ListItemText
        primary={tariffPlan.name}
        secondary={getTariffPlanDescription(tariffPlan)}
      />
      {props.rightIcon && formatRightIcon()}
    </ListItem>
  );
}

export default TariffPlanCard;
