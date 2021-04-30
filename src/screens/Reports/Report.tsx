import React from 'react';
import { FinancialSummaryRecord } from '../../lib/airtable/interface';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import OutlinedCardList, { CardPropsInfo } from '../../components/OutlinedCardList';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';
import { Person as PersonIcon, ShoppingCart as ShoppingCartIcon, Build as BuildIcon, Warning as WarningIcon } from '@material-ui/icons';
import ListItemWrapper from '../../components/ListItemWrapper';
import { useSelector } from 'react-redux';
import { roundToString } from '../../lib/utils/utils';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

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

interface ListPropsInfo {
  label: string;
  value: string;
}

function Report(props: ReportProps) {
  const intl = useInternationalization();
  const { classes, match } = props;
  const report = props.location.state.report;
  const deadline = props.location.state.deadline;
  const currentSite = useSelector(selectCurrentSiteInformation);
  const profit: CardPropsInfo[] = [{ number: roundToString(report.totalProfit), label: 'Profit', unit: 'Ks' }];

  // Customers
  const collected = `${roundToString(report.totalAmountCollected)} ${intl(words.ks)}`;
  const billed = `${roundToString(report.totalAmountBilled)} ${intl(words.ks)}`;
  const outstanding = `${roundToString(report.totalAmountBilled - report.totalAmountCollected)} ${intl(words.ks)}`;
  const paymentRate = report.totalCustomersBilled ? `${roundToString(report.totalCustomersPaid / report.totalCustomersBilled * 100)}%` : '--';
  const customers = [
    { label: intl(words.collected), value: collected},
    { label: intl(words.billed), value: billed},
    { label: intl(words.outstanding), value: outstanding },
    { label: intl(words.payment_rate), value: paymentRate },
  ];

  // Inventory
  const approved = `${roundToString(report.inventoryAmountApproved)} ${intl(words.ks)}`;
  const rejected = `${roundToString(report.inventoryAmountDenied)} ${intl(words.ks)}`;
  const inventory = [
    { label: intl(words.collected), value: collected},
    { label: intl(words.billed), value: billed},
    { label: intl(words.outstanding), value: outstanding },
    { label: intl(words.payment_rate), value: paymentRate },
  ];

  // TODO: Add calculations for maintenance & incidents
  const maintenance = [
    { label: intl(words.complete), value: '0' },
    { label: intl(words.incomplete), value: '0' },
  ];
  const incidents = [
    { label: intl(words.solved), value: '0' },
    { label: intl(words.unsolved), value: '0' },
  ];

  const getListContent = (content: ListPropsInfo[]) => (
    <div>
      <List className={classes.list}>
        {content.map((info, index) => (
          <div key={index}>
            <ListItemWrapper leftText={info.label} rightText={info.value} boldRightText smallLineHeight />
          </div>
        ))}
      </List>
      <ListItem divider />
    </div>
  );

  return (
    <BaseScreen leftIcon="backNav" title={intl(words.reports)} rightIcon="profile" match={match}>
      <BaseScrollView>
        <div className={classes.section}>
          <Typography variant="h1">{report.period}</Typography>
          <Typography variant="h2" color="textSecondary">{deadline}</Typography>
          <Typography color="textSecondary">{currentSite.name}</Typography>
        </div>
        <div className={classes.section}>
          <OutlinedCardList info={profit} highlightedBorder />
        </div>
        <div className={classes.section}>
          <div className={classes.section}>
            <div className={classes.header}>
              <PersonIcon fontSize="small" className={classes.icon} />
              <Typography variant="h5">{intl(words.customers)}</Typography>
            </div>
            {getListContent(customers)}
          </div>
          <div className={classes.section}>
            <div className={classes.header}>
              <ShoppingCartIcon fontSize="small" className={classes.icon} />
              <Typography variant="h5">{intl(words.inventory)}</Typography>
            </div>
            {getListContent(inventory)}
          </div>
          <div className={classes.section}>
            <div className={classes.header}>
              <BuildIcon fontSize="small" className={classes.icon} />
              <Typography variant="h5">{intl(words.maintenance)}</Typography>
            </div>
            {getListContent(maintenance)}
          </div>
          <div className={classes.section}>
            <div className={classes.header}>
              <WarningIcon fontSize="small" className={classes.icon} />
              <Typography variant="h5">{intl(words.incidents)}</Typography>
            </div>
            {getListContent(incidents)}
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(Report);
