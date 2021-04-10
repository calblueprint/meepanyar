import { List, ListItem, ListItemIcon, ListItemText, Typography, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { createStyles, Theme } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { formatDateStringToLocal } from '../../lib/moment/momentUtils';
import {
  selectCurrentInventory,
  selectCurrentInventoryProduct
} from '../../lib/redux/inventoryData';
import { EMPTY_INVENTORY } from '../../lib/redux/inventoryDataSlice';
import { getInventoryHistory, getInventoryLastUpdated } from '../../lib/utils/inventoryUtils';
import InventoryInfo from './components/InventoryInfo';
import { getPurchaseRequestStatusIcon } from './components/PurchaseRequestCard';

const styles = (theme: Theme) =>
  createStyles({
    section: {
      marginTop: '30px',
    },
  });

interface InventoryProps extends RouteComponentProps {
  classes: { section: string };
}

function InventoryProfile(props: InventoryProps) {
  const { classes } = props;
  const inventory = useSelector(selectCurrentInventory) || EMPTY_INVENTORY;
  const product = useSelector(selectCurrentInventoryProduct);
  const inventoryHistory = getInventoryHistory(inventory.id);

  // Redirect to InventoryMain if either are undefined
  if (inventory === EMPTY_INVENTORY || !product) {
    return <Redirect to={'/inventory'} />;
  }

  return (
    <BaseScreen leftIcon="backNav">
      <BaseScrollView>
        <InventoryInfo
          productId={inventory.productId}
          lastUpdated={getInventoryLastUpdated(inventory.id)}
          currentQuantity={inventory.currentQuantity}
          withActions
        />
        <div className={classes.section}>
          <Typography variant="body2">Recent Updates</Typography>
          <List>
            {inventoryHistory.map((historyRecord: any) => (
              <ListItem disableGutters>
                <ListItemIcon style={{ minWidth: 28 }}>
                  {historyRecord.status ? (
                    <AttachMoneyIcon color='primary' fontSize="small" />
                  ) : (
                    <FiberManualRecordIcon color='primary' fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText primary={formatDateStringToLocal(historyRecord.createdAt)} />
                <ListItemText
                  primaryTypographyProps={{ align: 'right' }}
                  primary={`${historyRecord.updatedQuantity || historyRecord.amountPurchased} ${product.unit}(s)`}
                />
                <ListItemSecondaryAction>
                  {historyRecord.status && (
                    <IconButton disabled edge="end" aria-label="delete" style={{ paddingRight: 0 }}>
                      {getPurchaseRequestStatusIcon(historyRecord.status, 'small')}
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(InventoryProfile);
