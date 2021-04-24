import React from 'react';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import OutlinedCardList from '../../components/OutlinedCardList';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';
import { Person as PersonIcon, ShoppingCart as ShoppingCartIcon, Build as BuildIcon, Warning as WarningIcon } from '@material-ui/icons';
import ListItemWrapper from '../../components/ListItemWrapper';
import { useSelector } from 'react-redux';

const styles = (theme: Theme) =>
  createStyles({
    section: {
      padding: '10px 5px',
    },
    header: {
      display: 'inline-flex',
      alignItems: 'center',
    },
    list: {
      borderLeft: `5px solid ${theme.palette.primary.main}`,
      padding: '2px 8px',
      margin: '4px',
    },
    icon: {
      marginRight: '5px',
    },
  });

interface ReportProps extends RouteComponentProps {
  classes: { section: string; header: string; list: string; icon: string; };
  location: any;
}

interface Info {
  label: string;
  value: string;
}

function Report(props: ReportProps) {
  const { classes, match } = props;
  const report = props.location.state.report;
  const deadline = props.location.state.deadline;
  const currentSite = useSelector(selectCurrentSiteInformation);

  console.log(report);

  // Rounds number to at most 2 decimal points
  // And converts to string
  const round = (number: number) => {
    return (Math.round(number * 100) / 100).toString();
  }

  // Customers
  const collected = `${round(report.totalAmountCollected)} Ks`;
  const billed = `${round(report.totalAmountBilled)} Ks`;
  const outstanding = `${round(report.totalAmountBilled - report.totalAmountCollected)} Ks`;
  const paymentRate = report.totalCustomersBilled ? `${round(report.totalCustomersPaid / report.totalCustomersBilled * 100)}%` : '--';

  // Inventory
  const approved = `${report.inventoryAmountApproved.toString()} Ks`;
  const rejected = `${report.inventoryAmountDenied.toString()} Ks`;

  // TODO: Add calculations for maintenance & incidents
  const info = {
    profit: [{ number: report.totalProfit, label: 'Profit', unit: 'Ks' }],
    customers: [
      { label: 'Collected', value: collected},
      { label: 'Billed', value: billed},
      { label: 'Outstanding', value: outstanding },
      { label: 'Payment Rate', value: paymentRate },
    ],
    inventory: [
      { label: 'Approved', value: approved },
      { label: 'Rejected', value: rejected },
    ],
    maintenance: [
      { label: 'Completed', value: '0' },
      { label: 'Incomplete', value: '0' },
    ],
    incidents: [
      { label: 'Solved', value: '0' },
      { label: 'Unsolved', value: '0' },
    ],
  }

  const getListContent = (content: Info[]) => (
    <div>
      <List className={classes.list}>
        {content.map((info, index) => (
          <div key={index}>
            <ListItemWrapper leftText={info.label} rightText={info.value} rightTextBlack smallLineHeight />
          </div>
        ))}
      </List>
      <ListItem divider />
    </div>
  );

  return (
    <BaseScreen leftIcon="backNav" title="Reports" rightIcon="profile" match={match}>
      <BaseScrollView>
        <div className={classes.section}>
          <Typography variant="h1">{report.period}</Typography>
          <Typography variant="h2" color="textSecondary">{deadline}</Typography>
          <Typography color="textSecondary">{currentSite.name}</Typography>
        </div>
        <div className={classes.section}>
          <OutlinedCardList info={info.profit} highlightedBorder />
        </div>
        <div className={classes.section}>
          <div className={classes.section}>
            <div className={classes.header}>
              <PersonIcon fontSize="small" className={classes.icon} />
              <Typography variant="h5">Customers</Typography>
            </div>
            {getListContent(info.customers)}
          </div>
          <div className={classes.section}>
            <div className={classes.header}>
              <ShoppingCartIcon fontSize="small" className={classes.icon} />
              <Typography variant="h5">Inventory</Typography>
            </div>
            {getListContent(info.inventory)}
          </div>
          <div className={classes.section}>
            <div className={classes.header}>
              <BuildIcon fontSize="small" className={classes.icon} />
              <Typography variant="h5">Maintenance</Typography>
            </div>
            {getListContent(info.maintenance)}
          </div>
          <div className={classes.section}>
            <div className={classes.header}>
              <WarningIcon fontSize="small" className={classes.icon} />
              <Typography variant="h5">Incidents</Typography>
            </div>
            {getListContent(info.incidents)}
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(Report);
