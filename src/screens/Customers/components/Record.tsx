import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { formatDateStringToLocal } from '../../../lib/moment/momentUtils';
import { round } from '../../../lib/redux/siteData';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: '7px',
      marginBottom: '15px',
      borderBottom: `1px solid ${theme.palette.text.secondary}`,
    },
  });

interface RecordProps {
  classes: { root: string; };
  date: string;
  used?: number | null;
  amount: number;
}

function Record(props: RecordProps) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="body2">
        {formatDateStringToLocal(props.date)}
      </Typography>
      <Typography variant="h1">
        {props.used ? round(props.used) + ' kWh |' : null} {round(props.amount)} Ks
      </Typography>
    </div>
  );
}
export default withStyles(styles)(Record);
