import { Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { InventoryUpdateRecord } from '../../lib/airtable/interface';
import { selectCurrentInventory, selectCurrentInventoryProduct, selectInventoryUpdatesArrayByInventoryId } from '../../lib/redux/inventoryData';
import { EMPTY_INVENTORY } from '../../lib/redux/inventoryDataSlice';
import { RootState } from '../../lib/redux/store';
import { getInventoryLastUpdated } from '../../lib/utils/inventoryUtils';
import InventoryInfo from './components/InventoryInfo';
import InventoryUpdateCard from './components/InventoryUpdateCard';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    section: {
      marginTop: '30px',
    },
  });

interface InventoryProps extends RouteComponentProps {
  classes: { content: string; section: string };
}

function InventoryProfile(props: InventoryProps) {
  const { classes } = props;
  const inventory = useSelector(selectCurrentInventory) || EMPTY_INVENTORY;
  const product = useSelector(selectCurrentInventoryProduct);
  const inventoryUpdates = useSelector((state: RootState) => selectInventoryUpdatesArrayByInventoryId(state, inventory.id));

  // Redirect to InventoryMain if either are undefined
  if (inventory === EMPTY_INVENTORY || !product) {
    return <Redirect to={'/inventory'} />;
  }

  return (
    <BaseScreen leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.content}>
          <InventoryInfo
            productId={inventory.productId}
            lastUpdated={getInventoryLastUpdated(inventory)}
            currentQuantity={inventory.currentQuantity}
            withActions
          />
          <div className={classes.section}></div>
        </div>
        <div className={classes.content}>
        <Typography variant="body2">Recent Updates</Typography>
        {inventoryUpdates.map((inventoryUpdate: InventoryUpdateRecord) =>  (
          <InventoryUpdateCard 
            key={inventoryUpdate.id} 
            updatedQuantity={inventoryUpdate.updatedQuantity}
            createdAt={inventoryUpdate.createdAt}
            inventoryId={inventoryUpdate.inventoryId}
            userId={inventoryUpdate.userId}
          />
        ))}
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(InventoryProfile);
