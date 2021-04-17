import { Badge, createStyles, Tab, Tabs, Theme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { selectPendingPurchaseRequestCount, selectProductByInventoryId } from '../../lib/redux/inventoryData';
import {
  PurchaseRequestStatus,
  selectAllCurrentSitePurchaseRequestsArray,
  SiteInventoryData
} from '../../lib/redux/inventoryDataSlice';
import { store } from '../../lib/redux/store';
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

  const [searchValue, setSearchValue] = useState('');
  const defaultPurchaseRequests = useSelector(selectAllCurrentSitePurchaseRequestsArray);
  const [purchaseRequests, setPurchaseRequests] = useState(defaultPurchaseRequests);
  const pendingCount = useSelector(selectPendingPurchaseRequestCount);
  const userIsAdmin = useSelector(selectCurrentUserIsAdmin);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    getPurchaseRequestData();
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value.trim();
    setSearchValue(searchVal);
  };

  const exitSearch = () => {
    setSearchValue('');
    setPurchaseRequests(defaultPurchaseRequests);
  };

  const getPurchaseRequestData = () => {
    if (searchValue !== '') {
      // Search by product name
      const filteredPurchaseRequests = defaultPurchaseRequests.filter((purchaseRequest) =>
        selectProductByInventoryId(store.getState(), purchaseRequest.inventoryId)?.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setPurchaseRequests(filteredPurchaseRequests);
    } else {
      setPurchaseRequests(defaultPurchaseRequests);
    }
  };
  
  const getPurchaseRequests = (status?: PurchaseRequestStatus) => (
    <div>
      {purchaseRequests
        .filter((pr) => (status ? pr.status === status : true))
        .map((purchaseRequest: PurchaseRequestRecord) => (
          <PurchaseRequestCard key={purchaseRequest.id} purchaseRequest={purchaseRequest} />
        ))}
    </div>
  );

  return (
    <BaseScreen title="All Purchases" leftIcon="backNav" searchAction={handleSearchChange} searchPlaceholder={"Search by inventory name"} searchExit={exitSearch}>
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
        {tabValue === 0 ? getPurchaseRequests() : getPurchaseRequests(PurchaseRequestStatus.PENDING)}
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(PurchaseRequests);