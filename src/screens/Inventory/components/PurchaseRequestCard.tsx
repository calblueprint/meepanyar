import { Card, CardActions, IconButton, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import { connect } from 'react-redux';
import { ProductRecord, PurchaseRequestRecord } from '../../../lib/airtable/interface';
import { getProductByInventoryId } from '../../../lib/redux/inventoryData';
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
  purchaseRequest: PurchaseRequestRecord;
  classes: {
    arrow: string; cardContent: string; cardContainer: string; arrowSpacing: string;
  };
  product: ProductRecord;
}

// TODO: sort by creation date/status
function PurchaseRequestCard(props: PurchaseRequestCardProps) {
  const { classes, purchaseRequest, product} = props;
  console.log(product);
  return (
    <Card className={classes.cardContainer}>
      <div className={classes.cardContent}>
        <Typography variant="body1">{`${product.name}, ${purchaseRequest.amountPurchased} ${product.unit}(s)`}</Typography>
        <Typography variant="body1">{`Created at: ${purchaseRequest.createdAt}`}</Typography>
        <Typography variant="body1">{`Requested by: ${purchaseRequest.requesterId}`}</Typography>
        <Typography variant="body1">{`Status: ${purchaseRequest.status}`}</Typography>
      </div>
      <CardActions>
        <IconButton size="small">
          <ArrowForwardIosIcon className={classes.arrow} fontSize="small"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state: RootState, ownProps: { purchaseRequest: { inventoryId: string; }; }) => ({
  product: getProductByInventoryId(ownProps.purchaseRequest.inventoryId),
});

export default connect(mapStateToProps)(withStyles(styles)(PurchaseRequestCard));
