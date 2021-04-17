import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: '7px',
      marginBottom: '15px',
      borderBottom: `1px solid ${theme.palette.text.secondary}`,
    },
    unbolded: {
      fontWeight: 500,
    },
  });

interface RecordProps {
  classes: { root: string; unbolded: string };
  date: string;
  used?: number | null;
  amount: number;
}

function Record(props: RecordProps) {
  const intl = useInternationalization();
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.unbolded}>
        {props.date}
      </Typography>
      <Typography variant="h1">
        {props.used ? props.used + ` ${intl(words.kwh)} |` : null} {props.amount} {intl(words.ks)}
      </Typography>
    </div>
  );
}
export default withStyles(styles)(Record);
