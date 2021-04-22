import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FinancialSummary } from '../../../lib/airtable/interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContent: {
      padding: '20px',
    },
    singleCard: {
      border: `1px solid ${theme.palette.text.disabled}`,
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'row',
      margin: '10px 0px',
    },
  }),
);

interface ReportCardProps {
  report: FinancialSummary;
  match: any;
}

export default function ReportCard(props: ReportCardProps): JSX.Element {
  const { report, match } = props;
  const classes = useStyles(props);

  return (
    <Card className={classes.singleCard} variant="outlined">
      <CardContent>
        <Typography color="textSecondary">{report.lastUpdated}</Typography>
        <Typography variant="h2">{report.period}</Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`${match.url}/report`}
          props={{ report: report }}
        >
          <Button label={'Outlined'} variant="outlined" color="primary">View</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
