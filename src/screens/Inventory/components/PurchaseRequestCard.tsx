import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import SyncIcon from '@material-ui/icons/Sync';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PurchaseRequestRecord } from '../../../lib/airtable/interface';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';
import { formatDateStringToLocal } from '../../../lib/moment/momentUtils';
import { setCurrentPurchaseRequestIdInRedux } from '../../../lib/redux/inventoryData';
import {
  EMPTY_PRODUCT,
  PurchaseRequestStatus,
  selectCurrentSiteInventoryById,
  selectProductById
} from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';
import { selectCurrentUserId, selectCurrentUserIsAdmin } from '../../../lib/redux/userData';
import { reviewPurchaseRequest } from '../../../lib/utils/inventoryUtils';
import { isOfflineId } from '../../../lib/utils/offlineUtils';
import { getPurchaseRequestReviewButtons } from '../PurchaseRequest';
import { roundToString } from '../../../lib/utils/utils';

const styles = (theme: Theme) =>
  createStyles({
    cardContent: {
      flex: 1,
      alignItems: 'center',
      display: 'flex',
      paddingRight: theme.spacing(1),
      '&:last-child': {
        paddingBottom: theme.spacing(2),
      },
    },
    leftContent: {
      flex: 1,
      marginRight: theme.spacing(1),
    },
    cardContainer: {
      borderRadius: 6,
      display: 'flex',
      marginBottom: theme.spacing(1),
    },
    cardActions: {
      minWidth: 70,
      justifyContent: 'flex-end',
    },
    headingRowContainer: {
      display: 'inline-flex',
    },
    syncIcon: {
      marginLeft: theme.spacing(1),
      color: theme.palette.text.primary,
    },
  });

interface PurchaseRequestCardProps {
  classes: {
    cardContent: string;
    cardContainer: string;
    leftContent: string;
    cardActions: string;
    headingRowContainer: string;
    syncIcon: string;
  };
  purchaseRequest: PurchaseRequestRecord;
  showSnackbarCallback: () => void;
}

export const getPurchaseRequestStatusIcon = (status: PurchaseRequestStatus, size?: 'small' | 'large', grey?: boolean ) => {
  switch (status) {
    case PurchaseRequestStatus.APPROVED:
      return <CheckCircleOutlineIcon color={grey ? 'secondary': 'primary'} fontSize={size || 'default'} />;
    case PurchaseRequestStatus.DENIED:
      return <CancelOutlinedIcon color={grey ? 'secondary': 'error'} fontSize={size || 'default'} />;
    default:
      return <HourglassEmptyIcon fontSize={size || 'default'} />;
  }
};

function PurchaseRequestCard(props: PurchaseRequestCardProps) {
  const intl = useInternationalization();
  const { classes, purchaseRequest, showSnackbarCallback } = props;
  const [status, setStatus] = useState(purchaseRequest.status);
  const product =
    useSelector((state: RootState) =>
      selectProductById(state, selectCurrentSiteInventoryById(state, purchaseRequest.inventoryId)?.productId || ''),
    ) || EMPTY_PRODUCT;
  const userId = useSelector(selectCurrentUserId);
  const userIsAdmin = useSelector(selectCurrentUserIsAdmin);

  const handleSubmitReview = (approved: boolean) => {
    // Only block users from reviewing requests that were created offline and not yet updated with Airtable IDs
    if (isOfflineId(purchaseRequest.id)) {
      showSnackbarCallback();
    } else {
      const newStatus = approved ? PurchaseRequestStatus.APPROVED : PurchaseRequestStatus.DENIED;
      setStatus(newStatus);
      reviewPurchaseRequest(purchaseRequest, approved, userId);
    }
  };

  return (
    <Card variant="outlined" className={classes.cardContainer}>
      <Link
        key={purchaseRequest.id}
        to={{ pathname: `/inventory/purchase-requests/purchase-request` }}
        style={{ flex: 1 }}
        onClick={() => setCurrentPurchaseRequestIdInRedux(purchaseRequest.id)}
      >
        <CardContent className={classes.cardContent}>
          <div className={classes.leftContent}>
            <div className={classes.headingRowContainer}>
              <Typography color="textPrimary" variant="h2">
                {intl(product.name)}
              </Typography>
              {isOfflineId(purchaseRequest.id) && <SyncIcon fontSize="small" className={classes.syncIcon} />}
            </div>
            <Typography variant="body1" color="textSecondary">{`${formatDateStringToLocal(
              purchaseRequest.createdAt,
            )}`}</Typography>
            <Typography variant="body1" color="textSecondary">{`${roundToString(purchaseRequest.amountPurchased)} ${intl(product.unit)}(${intl(words.s)})`}</Typography>
          </div>
          <Typography color="textPrimary" variant="h2">{`${roundToString(purchaseRequest.amountSpent)} ${intl(words.ks)}`}</Typography>
        </CardContent>
      </Link>
      <CardActions className={classes.cardActions}>
        {status === PurchaseRequestStatus.PENDING && userIsAdmin
          ? getPurchaseRequestReviewButtons(
              () => handleSubmitReview(true),
              () => handleSubmitReview(false),
            )
          : getPurchaseRequestStatusIcon(status)}
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(PurchaseRequestCard);
