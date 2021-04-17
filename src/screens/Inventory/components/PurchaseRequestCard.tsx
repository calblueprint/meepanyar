import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PurchaseRequestRecord } from '../../../lib/airtable/interface';
import { formatDateStringToLocal } from '../../../lib/moment/momentUtils';
import {
  EMPTY_PRODUCT,
  PurchaseRequestStatus,
  selectCurrentSiteInventoryById,
  selectProductById
} from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';
import { selectCurrentUserId, selectCurrentUserIsAdmin } from '../../../lib/redux/userData';
import { reviewPurchaseRequest } from '../../../lib/utils/inventoryUtils';
import { getPurchaseRequestReviewButtons } from '../PurchaseRequest';

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
  });

interface PurchaseRequestCardProps {
  classes: { cardContent: string; cardContainer: string; leftContent: string; cardActions: string };
  purchaseRequest: PurchaseRequestRecord;
}

export const getPurchaseRequestStatusIcon = (status: PurchaseRequestStatus, size?: 'small' | 'large') => {
  switch (status) {
    case PurchaseRequestStatus.APPROVED:
      return <CheckCircleOutlineIcon color={'primary'} fontSize={size || 'default'} />;
    case PurchaseRequestStatus.DENIED:
      return <CancelOutlinedIcon color={'error'} fontSize={size || 'default'} />;
    default:
      return <HourglassEmptyIcon fontSize={size || 'default'} />;
  }
};

function PurchaseRequestCard(props: PurchaseRequestCardProps) {
  const { classes, purchaseRequest } = props;
  const [status, setStatus] = useState(purchaseRequest.status);
  const product =
    useSelector((state: RootState) =>
      selectProductById(state, selectCurrentSiteInventoryById(state, purchaseRequest.inventoryId)?.productId || ''),
    ) || EMPTY_PRODUCT;
  const userId = useSelector(selectCurrentUserId);
  const userIsAdmin = useSelector(selectCurrentUserIsAdmin);

  const handleSubmitReview = (approved: boolean) => {
    const newStatus = approved ? PurchaseRequestStatus.APPROVED : PurchaseRequestStatus.DENIED;
    setStatus(newStatus);
    purchaseRequest.status = newStatus;
    reviewPurchaseRequest(purchaseRequest, approved, userId);
  };

  return (
    <Card variant="outlined" className={classes.cardContainer}>
      <Link
        key={purchaseRequest.id}
        to={{ pathname: `/inventory/purchase-requests/purchase-request`, state: { purchaseRequest } }}
        style={{ flex: 1 }}
      >
        <CardContent className={classes.cardContent}>
          <div className={classes.leftContent}>
            <Typography color="textPrimary" variant="h2">
              {product.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">{`${formatDateStringToLocal(purchaseRequest.createdAt)}`}</Typography>
            <Typography variant="body1" color="textSecondary">{`${purchaseRequest.amountPurchased} ${product.unit}(s)`}</Typography>
          </div>
          <Typography color="textPrimary" variant="h2">{`${purchaseRequest.amountSpent} Ks`}</Typography>
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
