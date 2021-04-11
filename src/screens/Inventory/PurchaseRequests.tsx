import { Badge, createStyles, Tab, Tabs, Theme, withStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { selectPendingPurchaseRequestCount } from '../../lib/redux/inventoryData';
import {
  PurchaseRequestStatus,
  selectAllCurrentSitePurchaseRequestsArray,
  SiteInventoryData
} from '../../lib/redux/inventoryDataSlice';
import { selectCurrentUserIsAdmin } from '../../lib/redux/userData';
import PurchaseRequestCard from './components/PurchaseRequestCard';

const styles = (theme: Theme) =>
  createStyles({
    tabs: {
      marginBottom: theme.spacing(1),
    },
  });

interface PurchaseRequestsProps extends RouteComponentProps {
  classes: { tabs: string };
  siteInventoryData: SiteInventoryData;
}

// TODO @wangannie: address empty state
function PurchaseRequests(props: PurchaseRequestsProps) {
  const { classes } = props;
  const [tabValue, setTabValue] = React.useState(0);

  const purchaseRequests = useSelector(selectAllCurrentSitePurchaseRequestsArray);
  const pendingCount = useSelector(selectPendingPurchaseRequestCount);
  const userIsAdmin = useSelector(selectCurrentUserIsAdmin);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const getPurchaseRequests = (status?: PurchaseRequestStatus) => (
    <div>
      {purchaseRequests
        .filter((pr) => (status ? pr.status == status : true))
        .map((purchaseRequest: PurchaseRequestRecord) => (
          <PurchaseRequestCard key={purchaseRequest.id} purchaseRequest={purchaseRequest} />
        ))}
    </div>
  );

  return (
    <BaseScreen title="All Purchases" leftIcon="backNav">
      {userIsAdmin && (
        <Tabs
          className={classes.tabs}
          indicatorColor="primary"
          value={tabValue}
          onChange={handleTabChange}
          aria-label="filter purchase requests"
        >
          <Tab label="All" id="tab-all" />
          <Tab
            style={{ overflow: 'visible' }}
            label={
              <Badge color="error" badgeContent={pendingCount}>
                Pending
              </Badge>
            }
            id="tab-pending"
          />
        </Tabs>
      )}
      <BaseScrollView>
        {/* Tab 0: All, Tab 1: Pending */}
        {tabValue == 0 ? getPurchaseRequests() : getPurchaseRequests(PurchaseRequestStatus.PENDING)}
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(PurchaseRequests);
