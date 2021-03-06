import { IconButton } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import CameraButton from '../../components/CameraButton';
import Snackbar from '../../components/Snackbar';
import TextField from '../../components/TextField';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
import { selectCurrentPurchaseRequest, selectProductByInventoryId } from '../../lib/redux/inventoryData';
import { EMPTY_PRODUCT, EMPTY_PURCHASE_REQUEST, PurchaseRequestStatus } from '../../lib/redux/inventoryDataSlice';
import { RootState } from '../../lib/redux/store';
import { selectCurrentUserId, selectCurrentUserIsAdmin } from '../../lib/redux/userData';
import { selectSiteUserById } from '../../lib/redux/userDataSlice';
import { getInventoryLastUpdated, reviewPurchaseRequest } from '../../lib/utils/inventoryUtils';
import { isOfflineId } from '../../lib/utils/offlineUtils';
import InventoryInfo from './components/InventoryInfo';
import { getPurchaseRequestStatusIcon } from './components/PurchaseRequestCard';
import { roundToString } from '../../lib/utils/utils';

const styles = (theme: Theme) =>
  createStyles({
    imageContainer: {
      border: `3.5px solid ${theme.palette.divider}`,
      radius: 6,
      padding: 0,
      width: '100%',
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(3),
    },
    reviewButtonsContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

interface PurchaseRequestsProps extends RouteComponentProps {
  classes: { imageContainer: string; headerContainer: string; reviewButtonsContainer: string };
}

export const getPurchaseRequestReviewButtons = (handleApprove: () => void, handleDeny: () => void) => {
  return (
    <div>
      <IconButton edge="end" size="small" onClick={handleDeny}>
        {getPurchaseRequestStatusIcon(PurchaseRequestStatus.DENIED)}
      </IconButton>
      <IconButton edge="end" size="small" onClick={handleApprove}>
        {getPurchaseRequestStatusIcon(PurchaseRequestStatus.APPROVED)}
      </IconButton>
    </div>
  );
};

function PurchaseRequest(props: PurchaseRequestsProps) {
  const intl = useInternationalization();
  const { classes, match } = props;
  const history = useHistory();
  const purchaseRequest = useSelector(selectCurrentPurchaseRequest) || EMPTY_PURCHASE_REQUEST;
  const product =
    useSelector((state: RootState) => selectProductByInventoryId(state, purchaseRequest.inventoryId)) || EMPTY_PRODUCT;
  const userIsAdmin = useSelector(selectCurrentUserIsAdmin);
  const currentUserId = useSelector(selectCurrentUserId);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const requester = useSelector((state: RootState) => selectSiteUserById(state, purchaseRequest.requesterId));

  // If a current purchase request is not found, redirect to InventoryMain
  if (purchaseRequest === EMPTY_PURCHASE_REQUEST || !product) {
    return <Redirect to={'/inventory'} />;
  }

  const handleSubmit = (purchaseRequest: PurchaseRequestRecord, approved: boolean) => {
    // Only block users from reviewing requests that were created offline and not yet updated with Airtable IDs
    if (isOfflineId(purchaseRequest.id)) {
      setShowSnackbar(true);
      // 5 second delay to reset back so it can be shown again.
      setTimeout(function () {
        setShowSnackbar(false);
      }, 5000);
    } else {
      reviewPurchaseRequest(purchaseRequest, approved, currentUserId);
      history.goBack();
    }
  };

  return (
    // Edit functionality is only enabled for admins and for purchase requests without offline IDs
    <BaseScreen
      title={intl(words.inventory_receipt)}
      leftIcon="backNav"
      rightIcon={userIsAdmin && !isOfflineId(purchaseRequest.id) ? 'edit' : undefined}
      match={match}
    >
      <BaseScrollView>
        <div className={classes.headerContainer}>
          <InventoryInfo
            inventoryId={purchaseRequest.inventoryId}
            productId={product.id}
            lastUpdated={getInventoryLastUpdated(purchaseRequest.inventoryId)}
          />
          <div className={classes.reviewButtonsContainer}>
            {userIsAdmin && purchaseRequest.status === PurchaseRequestStatus.PENDING
              ? getPurchaseRequestReviewButtons(
                  () => handleSubmit(purchaseRequest, true),
                  () => handleSubmit(purchaseRequest, false),
                )
              : getPurchaseRequestStatusIcon(purchaseRequest.status)}
          </div>
        </div>
        <TextField
          label={intl(words.amount_purchased)}
          unit={product.unit}
          disabled
          id={'amount-purchased'}
          value={roundToString(purchaseRequest.amountPurchased)}
        />
        <TextField
          label={intl(words.amount_spent)}
          currency
          disabled
          id={'amount-spent'}
          value={purchaseRequest.amountSpent}
        />
        <TextField label={intl(words.notes)} disabled id={'notes'} value={purchaseRequest.notes || intl(words.none)} />
        <TextField
          label={intl(words.submitted_by)}
          disabled
          id={'submitted-by'}
          value={requester?.name || purchaseRequest.requesterId}
        />
        {purchaseRequest.receipt && (
          <CameraButton
            staticPreview
            label={intl(words.receipt)}
            photoUri={purchaseRequest.receipt[0].url}
            id="receipt"
          />
        )}
      </BaseScrollView>
      <Snackbar
        open={showSnackbar}
        message="You are not connected to a network. Please reconnect to approve/deny this purchase request."
      />
    </BaseScreen>
  );
}

export default withStyles(styles)(PurchaseRequest);
