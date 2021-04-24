import { Badge, createStyles, Tab, Tabs, Theme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Snackbar from '../../components/Snackbar';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
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
  const intl = useInternationalization();
  const { classes } = props;
  const [tabValue, setTabValue] = React.useState(0);

  const [searchValue, setSearchValue] = useState('');
  const defaultPurchaseRequests = useSelector(selectAllCurrentSitePurchaseRequestsArray);
  const [purchaseRequests, setPurchaseRequests] = useState(defaultPurchaseRequests);
  const pendingCount = useSelector(selectPendingPurchaseRequestCount);
  const userIsAdmin = useSelector(selectCurrentUserIsAdmin);
  const [showSnackbar, setShowSnackbar] = useState(false);

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
        selectProductByInventoryId(store.getState(), purchaseRequest.inventoryId)
          ?.name.toLowerCase()
          .includes(searchValue.toLowerCase()),
      );
      setPurchaseRequests(filteredPurchaseRequests);
    } else {
      setPurchaseRequests(defaultPurchaseRequests);
    }
  };

  // Callback function to show the offline snackbar if an admin user attempts
  // to approve/deny a request from the PurchaseRequestCard while offline.
  const showSnackbarCallback = () => {
    setShowSnackbar(true);
    // 5 second delay to reset back so it can be shown again.
    setTimeout(function () {
      setShowSnackbar(false);
    }, 5000);
  };

  const getPurchaseRequests = (status?: PurchaseRequestStatus) => (
    <div>
      {purchaseRequests
        .filter((pr) => (status ? pr.status === status : true))
        .map((purchaseRequest: PurchaseRequestRecord) => (
          <PurchaseRequestCard
            key={purchaseRequest.id}
            purchaseRequest={purchaseRequest}
            showSnackbarCallback={showSnackbarCallback}
          />
        ))}
    </div>
  );

  return (
    <BaseScreen
      title={words.all_purchases}
      leftIcon="backNav"
      searchAction={handleSearchChange}
      searchPlaceholder={intl(words.search_by_inventory_name)}
      searchExit={exitSearch}
    >
      {userIsAdmin && (
        <Tabs
          className={classes.tabs}
          indicatorColor="primary"
          value={tabValue}
          onChange={handleTabChange}
          aria-label="filter purchase requests"
        >
          <Tab label={intl(words.view_all)} id="tab-all" />
          <Tab
            style={{ overflow: 'visible' }}
            label={
              <Badge color="error" badgeContent={pendingCount}>
                {intl(words.pending)}
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
      <Snackbar
        open={showSnackbar}
        message="You are not connected to a network. Please reconnect to approve/deny this purchase request."
      />
    </BaseScreen>
  );
}

export default withStyles(styles)(PurchaseRequests);
