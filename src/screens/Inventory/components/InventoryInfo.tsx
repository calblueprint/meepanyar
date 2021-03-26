
import { Typography, withStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { InventoryRecord, ProductRecord } from '../../../lib/airtable/interface';
import { getInventoryLastUpdated } from '../../../lib/utils/inventoryUtils';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '6px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    leftColumnContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    rightColumnContainer: {
      textAlign: 'right',
    },
  });

interface InventoryInfoProps {
  classes: { content: string; leftColumnContainer: string; rightColumnContainer: string; };
  product: ProductRecord;
  inventory: InventoryRecord; // TODO: calculate last updated
}

function InventoryInfo(props: InventoryInfoProps) {
  // TODO: better to pass in individual vars or whole inventory record?
  const { classes, product, inventory } = props;

  return (
    <div className={classes.content}>
      <div className={classes.leftColumnContainer}>
        <Typography variant="h2" color="textPrimary">
          {product.name}
        </Typography>
        <Typography variant="caption">
          Last Updated
        </Typography>
        <Typography variant="caption">
          {getInventoryLastUpdated(inventory)}
        </Typography>
      </div>
      <div className={classes.rightColumnContainer}>
        <Typography variant="body2">{`${inventory.currentQuantity} ${product.unit}(s)`}</Typography>
      </div>
    </div>
  );
}

export default withStyles(styles)(InventoryInfo);
