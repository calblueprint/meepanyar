import {
    createStyles,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Theme,
    withStyles
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { selectCurrentPurchaseRequest } from '../../lib/redux/inventoryData';
import { EMPTY_PURCHASE_REQUEST, PurchaseRequestStatus } from '../../lib/redux/inventoryDataSlice';
import { selectCurrentUserId, selectCurrentUserIsAdmin } from '../../lib/redux/userData';
import { reviewPurchaseRequest } from '../../lib/utils/inventoryUtils';
import { getPurchaseRequestStatusIcon } from './components/PurchaseRequestCard';

const styles = (theme: Theme) =>
  createStyles({
    listContainer: {
      marginBottom: theme.spacing(4),
    },
  });

interface EditPurchaseRequestProps extends RouteComponentProps {
  classes: { listContainer: string };
}

function EditPurchaseRequest(props: EditPurchaseRequestProps) {
  const { classes } = props;
  const history = useHistory();
  const purchaseRequest: PurchaseRequestRecord = useSelector(selectCurrentPurchaseRequest) || EMPTY_PURCHASE_REQUEST;
  const userId = useSelector(selectCurrentUserId);
  const userIsAdmin = useSelector(selectCurrentUserIsAdmin);
  const [status, setStatus] = useState(purchaseRequest.status);

  // Redirect to InventoryMain if a current purchase request is not found or if the user is not an admin
  if (purchaseRequest === EMPTY_PURCHASE_REQUEST || !userIsAdmin) {
    return <Redirect to={'/inventory'} />;
  }

  const handleSubmit = () => {
    reviewPurchaseRequest(purchaseRequest, status === PurchaseRequestStatus.APPROVED, userId);
    history.goBack();
  };

  return (
    <BaseScreen title={'Inventory Receipt'} leftIcon="backNav">
      <List className={classes.listContainer}>
        <ListItem disableGutters>
          <ListItemText primary="Edit Approval Status" />
          <ListItemSecondaryAction>
            <IconButton edge="end" size="small" onClick={() => setStatus(PurchaseRequestStatus.DENIED)}>
              {getPurchaseRequestStatusIcon(
                PurchaseRequestStatus.DENIED,
                undefined,
                status === PurchaseRequestStatus.APPROVED,
              )}
            </IconButton>
            <IconButton edge="end" size="small" onClick={() => setStatus(PurchaseRequestStatus.APPROVED)}>
              {getPurchaseRequestStatusIcon(
                PurchaseRequestStatus.APPROVED,
                undefined,
                status === PurchaseRequestStatus.DENIED,
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Button fullWidth label="Save Changes" onClick={handleSubmit} />
    </BaseScreen>
  );
}

export default withStyles(styles)(EditPurchaseRequest);
