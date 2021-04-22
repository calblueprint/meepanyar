import { Badge, createStyles, Fab, Theme, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import Snackbar from '../../components/Snackbar';
import { InventoryRecord } from '../../lib/airtable/interface';
import {
  selectPendingPurchaseRequestCount,
  selectProductByInventoryId,
  setCurrentInventoryIdInRedux
} from '../../lib/redux/inventoryData';
import { selectAllCurrentSiteInventoryArray } from '../../lib/redux/inventoryDataSlice';
import { store } from '../../lib/redux/store';
import { selectCurrentUserIsAdmin } from '../../lib/redux/userData';
import { getInventoryLastUpdated } from '../../lib/utils/inventoryUtils';
import InventoryCard from './components/InventoryCard';

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(10),
      right: theme.spacing(2),
      color: theme.palette.background.paper,
    },
    headerWrapper: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: theme.spacing(1),
    },
  });

interface InventoryProps extends RouteComponentProps {
  classes: {
    fab: string;
    headerWrapper: string;
  };
}

// Needed to vertically align the badge with the text button
const InlineBadge = withStyles(() =>
  createStyles({
    badge: {
      right: -4,
      top: 26,
    },
  }),
)(Badge);

// TODO @wangannie: address empty state
function InventoryMain(props: InventoryProps) {
  const { classes } = props;
  const defaultSiteInventory = useSelector(selectAllCurrentSiteInventoryArray);
  const [siteInventory, setSiteInventory] = useState(defaultSiteInventory);
  const [searchValue, setSearchValue] = useState('');
  const userIsAdmin = useSelector(selectCurrentUserIsAdmin);
  const pendingCount = useSelector(selectPendingPurchaseRequestCount);

  useEffect(() => {
    getInventory();
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value.trim();
    setSearchValue(searchVal);
  };

  const exitSearch = () => {
    setSearchValue('');
    setSiteInventory(defaultSiteInventory);
  };

  const getInventory = () => {
    if (searchValue !== '') {
      // Search by product name
      const filteredInventory = defaultSiteInventory.filter((inv) =>
        selectProductByInventoryId(store.getState(), inv.id)?.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setSiteInventory(filteredInventory);
    } else {
      setSiteInventory(defaultSiteInventory);
    }
  };

  return (
    <BaseScreen searchAction={handleSearchChange} searchPlaceholder={"Search by inventory name"} searchExit={exitSearch}>
      <div className={classes.headerWrapper}>
        <Typography variant="h1">Inventory</Typography>
        <Link to={'/inventory/purchase-requests'}>
          {/* Hide the badge for non-admin users */}
          <InlineBadge color="error" badgeContent={!userIsAdmin ? 0 : pendingCount}>
            <Button variant="text" label="All Purchases" />
          </InlineBadge>
        </Link>
      </div>
      <BaseScrollView>
        {siteInventory.map((inventory: InventoryRecord) => (
          <Link key={inventory.id} to={'/inventory/item'} onClick={() => setCurrentInventoryIdInRedux(inventory.id)}>
            <InventoryCard
              key={inventory.id}
              inventoryId={inventory.id}
              currentQuantity={inventory.currentQuantity}
              productId={inventory.productId}
              lastUpdated={getInventoryLastUpdated(inventory.id)}
            />
          </Link>
        ))}
      </BaseScrollView>
      <Link to={'/inventory/create'}>
        <Fab color="primary" aria-label="add inventory" className={classes.fab} size="medium">
          <AddIcon fontSize="large" />
        </Fab>
      </Link>
      <Snackbar withFab message="You are not connected to a network. Some logs may not be fully up to date." />
    </BaseScreen>
  );
}

export default withStyles(styles)(InventoryMain);
