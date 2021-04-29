import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';
import { formatDateStringToLocal } from '../../../lib/moment/momentUtils';
import { roundToString } from '../../../lib/utils/utils';

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
  const intl = useInternationalization();
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="body2">
        {formatDateStringToLocal(props.date)}
      </Typography>
      <Typography variant="h1">
        {props.used ? roundToString(props.used) + ` ${intl(words.kwh)} |` : null} {roundToString(props.amount)} {intl(words.ks)}
      </Typography>
    </div>
  );
}
export default withStyles(styles)(Record);
