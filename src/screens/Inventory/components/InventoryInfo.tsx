import { Card, CardActions, CardContent, Typography, withStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { EMPTY_PRODUCT, selectProductById } from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';

const styles = (theme: Theme) =>
  createStyles({
    cardContainer: {
      backgroundColor: theme.palette.primary.light,
      boxShadow: 'none',
      borderRadius: 6,
      marginBottom: 20,
    },
    cardContent: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftContentColumnContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    cardActions: {
      justifyContent: 'space-around',
    },
  });

interface InventoryInfoProps {
  classes: { cardContainer: string; cardContent: string; leftContentColumnContainer: string; cardActions: string };
  productId: string;
  lastUpdated: string;
  currentQuantity: number;
  withActions?: boolean;
}

const getPurchaseRequestButton = () => (
  <Link to={'purchase-requests/create'}>
    <Button label="Purchase" />
  </Link>
);

const getUpdateButton = () => (
  <Link to={'updates/create'}>
    <Button variant="outlined" label={'Update'} />
  </Link>
);

function InventoryInfo(props: InventoryInfoProps) {
  const { classes, productId, lastUpdated, currentQuantity, withActions } = props;
  const product = useSelector((state: RootState) => selectProductById(state, productId)) || EMPTY_PRODUCT;

  return (
    <Card className={classes.cardContainer}>
      <CardContent className={classes.cardContent}>
        <div className={classes.leftContentColumnContainer}>
          <Typography variant="h2" color="textPrimary">
            {product.name}
          </Typography>
          <Typography variant="caption">Last Updated</Typography>
          <Typography variant="caption">{lastUpdated}</Typography>
        </div>
        <Typography align="right" variant="body2">{`${currentQuantity} ${product.unit}(s)`}</Typography>
      </CardContent>
      {withActions && (
        <CardActions className={classes.cardActions}>
          {getUpdateButton()}
          {getPurchaseRequestButton()}
        </CardActions>
      )}
    </Card>
  );
}

export default withStyles(styles)(InventoryInfo);
