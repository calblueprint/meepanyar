import { Badge, createStyles, Tab, Tabs, Theme, withStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
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

// TODO @wangannie: remove before merge if not using
const styles = (theme: Theme) => createStyles({});

interface PurchaseRequestsProps extends RouteComponentProps {
  classes: {};
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
          <Link
            key={purchaseRequest.id}
            to={{ pathname: `/inventory/purchase-requests/purchase-request`, state: { purchaseRequest } }}
          >
            <PurchaseRequestCard
              key={purchaseRequest.id}
              status={purchaseRequest.status}
              amountPurchased={purchaseRequest.amountPurchased}
              createdAt={purchaseRequest.createdAt}
              amountSpent={purchaseRequest.amountSpent}
              inventoryId={purchaseRequest.inventoryId}
            />
          </Link>
        ))}
    </div>
  );

  return (
    <BaseScreen title="All Purchases" leftIcon="backNav">
      <BaseScrollView>
        {userIsAdmin && (
          <Tabs
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
        {/* Tab 0: All, Tab 1: Pending */}
        {tabValue == 0 ? getPurchaseRequests() : getPurchaseRequests(PurchaseRequestStatus.PENDING)}
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(PurchaseRequests);
