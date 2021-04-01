import { Card, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    EMPTY_PRODUCT,
    selectCurrentSiteInventoryById,
    selectProductById
} from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';

const styles = (theme: Theme) =>
  createStyles({
    arrow: {
      color: theme.palette.text.primary,
    },
    cardContent: {
      flex: 1,
      padding: 16,
    },
    cardContainer: {
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: 'none',
      borderRadius: 10,
      display: 'flex',
      marginBottom: 10,
    },
    arrowSpacing: {
      padding: 0,
    },
  });

interface InventoryUpdateCardProps {
  classes: { arrow: string; cardContent: string; cardContainer: string; arrowSpacing: string };
  inventoryId: string;
  updatedQuantity: number;
  createdAt: string;
  userId: string;
}

function InventoryUpdateCard(props: InventoryUpdateCardProps) {
  const { classes, inventoryId, updatedQuantity, createdAt, userId } = props;
  const product =
    useSelector((state: RootState) =>
      selectProductById(state, selectCurrentSiteInventoryById(state, inventoryId)?.productId || ''),
    ) || EMPTY_PRODUCT;

  return (
    <Card className={classes.cardContainer}>
      <div className={classes.cardContent}>
        <Typography variant="body1">{`${product.name}, ${updatedQuantity} ${product.unit}(s)`}</Typography>
        <Typography variant="body1">{`Created at: ${createdAt}`}</Typography>
        <Typography variant="body1">{`Updated by: ${userId}`}</Typography>
      </div>
    </Card>
  );
}

export default withStyles(styles)(InventoryUpdateCard);
