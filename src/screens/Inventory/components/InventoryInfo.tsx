
import { Typography, withStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { EMPTY_PRODUCT, selectProductById } from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';

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
  productId: string,
  lastUpdated: string,
  currentQuantity: number,
}

function InventoryInfo(props: InventoryInfoProps) {
  const { classes, productId, lastUpdated, currentQuantity} = props;
  const product = useSelector((state: RootState) => selectProductById(state, productId)) || EMPTY_PRODUCT;

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
          {lastUpdated}
        </Typography>
      </div>
      <div className={classes.rightColumnContainer}>
        <Typography variant="body2">{`${currentQuantity} ${product.unit}(s)`}</Typography>
      </div>
    </div>
  );
}

export default withStyles(styles)(InventoryInfo);
