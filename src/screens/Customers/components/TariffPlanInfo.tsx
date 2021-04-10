import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { CardPropsInfo } from '../../../components/OutlinedCardList';
import { MeterType } from '../../../lib/redux/customerDataSlice';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: '10px',
      border: '1px solid',
      borderColor: theme.palette.background.default,
      backgroundColor: theme.palette.background.default,
      borderRadius: '6px',
    },
    content: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
    },
    item: {
      width: '100%',
      color: theme.palette.text.secondary,
    },
    label: {
      whiteSpace: 'pre-line',
      lineHeight: '1.2',
      marginTop: '5px',
    },
  });

interface TariffPlanInfoProps {
  classes: { root: string; content: string; item: string; label: string; };
  undefinedAmount: string;
  meterType: string;
  fixedTariff: string;
  unitTariff: string;
  freeUnits: string;
}

function TariffPlanInfo(props: TariffPlanInfoProps) {
  const { classes, undefinedAmount, meterType, fixedTariff, unitTariff, freeUnits } = props;

  let tariffInfo : CardPropsInfo[];
  //TODO: swap with something like customer.inactive
  if (meterType === MeterType.INACTIVE) {
    tariffInfo = [
      { number: undefinedAmount, label: 'Fixed\nTariff', unit: '' },
      { number: undefinedAmount, label: 'Unit\nTariff', unit: '' },
      { number: undefinedAmount, label: 'Free\nUnits', unit: '' },
    ];
  } else {
    tariffInfo = [
      { number: fixedTariff , label: 'Fixed\nTariff', unit: 'Ks' },
      { number: unitTariff, label: 'Unit\nTariff', unit: 'Ks' },
      { number: freeUnits, label: 'Free\nUnits', unit: 'kWh' },
    ];
  }

  return (
    <div className={classes.root} style={{ backgroundColor: meterType != MeterType.INACTIVE ? 'white' : undefined }}>
      <div className={classes.content}>
        {tariffInfo.map((info, index) => (
          <div key={index} className={classes.item}>
            <Typography variant="h3" align={'center'}>
              {info.number} {info.unit}
            </Typography>
            <Typography variant="body1" align={'center'} className={classes.label}>{info.label}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(TariffPlanInfo);
