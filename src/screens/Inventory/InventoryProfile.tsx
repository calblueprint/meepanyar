import { List, ListItem, ListItemIcon, ListItemText, Typography, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { createStyles, Theme } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import OfflineDialog from '../../components/OfflineDialog';
import Snackbar from '../../components/Snackbar';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
import { formatDateStringToLocal } from '../../lib/moment/momentUtils';
import { selectCurrentInventory, selectCurrentInventoryProduct } from '../../lib/redux/inventoryData';
import { EMPTY_INVENTORY } from '../../lib/redux/inventoryDataSlice';
import { selectIsOnline } from '../../lib/redux/userData';
import { getInventoryHistory, getInventoryLastUpdated } from '../../lib/utils/inventoryUtils';
import { isOfflineId } from '../../lib/utils/offlineUtils';
import InventoryInfo from './components/InventoryInfo';
import { getPurchaseRequestStatusIcon } from './components/PurchaseRequestCard';
import { round } from '../../lib/redux/siteData';

const styles = (theme: Theme) =>
  createStyles({
    section: {
      marginTop: theme.spacing(2),
    },
    purchaseRequestText: {
      textDecoration: 'underline',
    },
  });

interface InventoryProps extends RouteComponentProps {
  classes: { section: string; purchaseRequestText: string };
}

function InventoryProfile(props: InventoryProps) {
  const intl = useInternationalization();
  const { classes } = props;
  const inventory = useSelector(selectCurrentInventory) || EMPTY_INVENTORY;
  const product = useSelector(selectCurrentInventoryProduct);
  const inventoryHistory = getInventoryHistory(inventory.id);
  const history = useHistory();
  const isOnline = useSelector(selectIsOnline);

  // Redirect to InventoryMain if either are undefined
  if (inventory === EMPTY_INVENTORY || !product) {
    return <Redirect to={'/inventory'} />;
  }

  const navigateToPurchaseRequest = (purchaseRequest: PurchaseRequestRecord) => {
    history.push('/inventory/purchase-requests/purchase-request', {
      purchaseRequest,
    });
  };

  return (
    <BaseScreen leftIcon="backNav">
      <BaseScrollView>
        <InventoryInfo
          inventoryId={inventory.id}
          productId={inventory.productId}
          lastUpdated={getInventoryLastUpdated(inventory.id)}
          currentQuantity={inventory.currentQuantity}
          withActions
        />
        <div className={classes.section}>
          <Typography variant="body2">{intl(words.latest_updates)}</Typography>
          <List>
            {inventoryHistory.map((historyRecord: any) => {
              const isPurchaseRequest = 'amountPurchased' in historyRecord;
              return (
                <ListItem
                  disableGutters
                  key={historyRecord.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  button={isPurchaseRequest as any} // necessary workaround for material-ui bug
                  onClick={() => isPurchaseRequest && navigateToPurchaseRequest(historyRecord)}
                >
                  <ListItemIcon style={{ minWidth: 28 }}>
                    {historyRecord.status ? (
                      <AttachMoneyIcon color="primary" fontSize="small" />
                    ) : (
                      <FiberManualRecordIcon color="primary" fontSize="small" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: 'body2' }}
                    className={isPurchaseRequest ? classes.purchaseRequestText : undefined}
                    primary={formatDateStringToLocal(historyRecord.createdAt)}
                  />
                  {isPurchaseRequest && (
                    <ListItemText
                      className={isPurchaseRequest ? classes.purchaseRequestText : undefined}
                      primaryTypographyProps={{ variant: 'body2', align: 'right' }}
                      primary={`${round(historyRecord.amountSpent) || 0} ${intl(words.ks)}`}
                    />
                  )}
                  <ListItemText
                    className={isPurchaseRequest ? classes.purchaseRequestText : undefined}
                    primaryTypographyProps={{ variant: 'body2', align: 'right' }}
                    primary={`${round(historyRecord.updatedQuantity) || 0} ${product.unit}(${intl(words.s)})`}
                  />
                  <ListItemSecondaryAction>
                    {historyRecord.status && (
                      <IconButton disabled edge="end" aria-label="delete" style={{ paddingRight: 0 }}>
                        {getPurchaseRequestStatusIcon(historyRecord.status, 'small')}
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </BaseScrollView>
      {/* Show the snackbar whenever the user is offline regardless of what actions they took, if any. */}
      {/* Exception: don't show the snackbar if showing OfflineDialog */}
      <Snackbar
        open={!isOfflineId(inventory.id) && !isOnline}
        message="You are not connected to a network. Inventory updates and purchases will be recorded after you reconnect."
      />
      <OfflineDialog
        open={isOfflineId(inventory.id)}
        closeAction={history.goBack}
        headingText="New Inventory Data Offline"
        bodyText="Inventory cannot be edited until information has been uploaded. Connect to a network to add data."
      />
    </BaseScreen>
  );
}

export default withStyles(styles)(InventoryProfile);
