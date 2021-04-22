import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';
import { FinancialSummaryRecord } from '../../../lib/airtable/interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid ${theme.palette.text.disabled}`,
      borderRadius: '8px',
      display: 'inline-flex',
      width: '100%',
      margin: '10px 0px',
      padding: '10px 5px',
    },
    content: {
      width: '100%',
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '50%',
      marginRight: '5px',
    },
  }),
);

interface ReportCardProps {
  report: FinancialSummaryRecord;
  match: any;
}

export default function ReportCard(props: ReportCardProps): JSX.Element {
  const { report, match } = props;
  const classes = useStyles(props);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        <Typography color="textSecondary">{report.lastUpdated}</Typography>
        <Typography variant="h2">{report.period}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Link
          to={{
            pathname: `${match.url}/report`,
            state: { report: report }
          }}
        >
          <Button label={'View'} variant="outlined" />
        </Link>
      </CardActions>
    </Card>
  );
}
