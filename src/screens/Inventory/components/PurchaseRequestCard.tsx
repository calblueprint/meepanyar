import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatDateStringToLocal } from '../../../lib/moment/momentUtils';
import {
  EMPTY_PRODUCT,
  PurchaseRequestStatus,
  selectCurrentSiteInventoryById,
  selectProductById
} from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';

const styles = (theme: Theme) =>
  createStyles({
    cardContent: {
      flex: 1,
      alignItems: 'center',
      display: 'flex',
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
  });

interface PurchaseRequestCardProps {
  classes: { cardContent: string; cardContainer: string; leftContent: string };
  inventoryId: string;
  amountPurchased: number;
  createdAt: string;
  amountSpent: number;
  status: PurchaseRequestStatus;
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
  const { classes, inventoryId, amountPurchased, createdAt, status, amountSpent } = props;
  const product =
    useSelector((state: RootState) =>
      selectProductById(state, selectCurrentSiteInventoryById(state, inventoryId)?.productId || ''),
    ) || EMPTY_PRODUCT;

  return (
    <Card variant="outlined" className={classes.cardContainer}>
      <CardContent className={classes.cardContent}>
        <div className={classes.leftContent}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography variant="body1" color="textSecondary">{`${formatDateStringToLocal(
            createdAt,
          )}  •  ${amountPurchased} ${product.unit}(s)`}</Typography>
        </div>
        <Typography variant="h2">{`${amountSpent} Ks`}</Typography>
      </CardContent>
      <CardActions>{getPurchaseRequestStatusIcon(status)}</CardActions>
    </Card>
  );
}

export default withStyles(styles)(PurchaseRequestCard);
