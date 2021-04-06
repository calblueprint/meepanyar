import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { CardPropsInfo } from '../../../components/OutlinedCardList';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: '10px',
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: '6px',
    },
    content: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',
    },
    item: {
      width: '100%',
      color: theme.palette.text.primary,
    },
    label: {
      whiteSpace: 'pre-line',
      lineHeight: '1.2',
      marginTop: '5px',
    },
    gray: {
      color: 'rgba(189,189,189,1)',
    },
  });

interface TariffPlanInfoProps {
  classes: { root: string; content: string; item: string; gray: string; label: string; };
  undefinedAmount: string;
  meterType: string;
  fixedTariff: string;
  unitTariff: string;
  minUnits: string;
}

function TariffPlanInfo(props: TariffPlanInfoProps) {
  const { classes, undefinedAmount, meterType, fixedTariff, unitTariff, minUnits } = props;

  if (meterType === "Inactive") {
    const tariffInfo : CardPropsInfo[] = [
      { number: undefinedAmount, label: 'Fixed\nTariff', unit: '' },
      { number: undefinedAmount, label: 'Unit\nTariff', unit: '' },
      { number: undefinedAmount, label: 'Minimum\nUnits', unit: '' },
    ];
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          {tariffInfo.map((info, index) => (
            <div key={index} className={classes.item}>
              <Typography variant="h3" align={'center'} style={{ color: 'rgba(189,189,189,1)' }}>
                {info.number} {info.unit}
              </Typography>
              <Typography variant="body1" align={'center'} className={classes.label}>{info.label}</Typography>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const tariffInfo : CardPropsInfo[] = [
      { number: fixedTariff , label: 'Fixed\nTariff', unit: 'Ks' },
      { number: unitTariff, label: 'Unit\nTariff', unit: 'Ks' },
      { number: minUnits, label: 'Minimum\nUnits', unit: 'kWh' },
    ]
    return (
      <div className={classes.root}>
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
}

export default withStyles(styles)(TariffPlanInfo);
