import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';
import { FinancialSummaryRecord } from '../../../lib/airtable/interface';
import { formatDateStringToLocal } from '../../../lib/moment/momentUtils';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';

interface ReportCardProps {
  report: FinancialSummaryRecord;
  deadline: string;
  current?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: ReportCardProps) => ({
      border: `1px solid ${props.current ? theme.palette.primary.main : theme.palette.text.disabled}`,
      borderRadius: '8px',
      display: 'inline-flex',
      width: '100%',
      margin: '10px 0px',
      padding: '10px 5px',
    }),
    content: (props: ReportCardProps) => ({
      width: '100%',
      display: props.current ? 'flex' : undefined,
      alignItems: props.current ? 'center' : undefined,
    }),
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '50%',
      marginRight: '5px',
    },
  }),
);

export default function ReportCard(props: ReportCardProps): JSX.Element {
  const intl = useInternationalization(); 
  const { report, deadline } = props;
  const classes = useStyles(props);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        {!props.current &&
          <Typography color="textSecondary">{formatDateStringToLocal(report.lastUpdated)}</Typography>}
        <Typography variant="h2">{report.period}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Link
          to={{
            pathname: `/financial-summaries/report`,
            state: { report: report, deadline: deadline }
          }}
        >
          <Button label={intl(words.view)} variant="outlined" />
        </Link>
      </CardActions>
    </Card>
  );
}
