import { Card, CardActions, IconButton, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import { connect } from 'react-redux';
import { ProductRecord } from '../../../lib/airtable/interface';
import { getProductIdByInventoryId } from '../../../lib/redux/inventoryData';
import { EMPTY_PRODUCT, PurchaseRequestStatus, selectProductById } from '../../../lib/redux/inventoryDataSlice';
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
      marginBottom: 10
    },
    arrowSpacing: {
      padding: 0
    },
  });

  interface PurchaseRequestCardProps {
    classes: { arrow: string; cardContent: string; cardContainer: string; arrowSpacing: string; };
    inventoryId: string;
    product: ProductRecord;
    amountPurchased: number;
    createdAt: string;
    requesterId: string;
    status: PurchaseRequestStatus;
  }

// TODO: sort by creation date/status
function PurchaseRequestCard(props: PurchaseRequestCardProps) {
  const { classes, product, amountPurchased, createdAt, requesterId, status } = props;
  
  return (
    <Card className={classes.cardContainer}>
      <div className={classes.cardContent}>
        <Typography variant="body1">{`${product.name}, ${amountPurchased} ${product.unit}(s)`}</Typography>
        <Typography variant="body1">{`Created at: ${createdAt}`}</Typography>
        <Typography variant="body1">{`Requested by: ${requesterId}`}</Typography>
        <Typography variant="body1">{`Status: ${status}`}</Typography>
      </div>
      <CardActions>
        <IconButton size="small">
          <ArrowForwardIosIcon className={classes.arrow} fontSize="small"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state: RootState, ownProps: { inventoryId: string; }) => ({
  product: selectProductById(state, getProductIdByInventoryId(ownProps.inventoryId)) || EMPTY_PRODUCT,
});

export default connect(mapStateToProps)(withStyles(styles)(PurchaseRequestCard));
