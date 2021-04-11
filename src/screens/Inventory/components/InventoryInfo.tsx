import { Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { EMPTY_PRODUCT, selectProductById } from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';

interface InventoryInfoProps {
  productId: string;
  lastUpdated: string;
  currentQuantity?: number;
  withActions?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      borderColor: theme.palette.primary.light,
      borderRadius: 6,
      flex: 2,
    },
    cardContent: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      '&:last-child': {
        paddingBottom: theme.spacing(2),
      },
    },
    leftContentColumnContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    cardActions: {
      justifyContent: 'space-around',
    },
  }),
);

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
  const classes = useStyles(props);
  const { productId, lastUpdated, currentQuantity, withActions } = props;
  const product = useSelector((state: RootState) => selectProductById(state, productId)) || EMPTY_PRODUCT;

  return (
    <Card variant="outlined" className={classes.cardContainer}>
      <CardContent className={classes.cardContent}>
        <div className={classes.leftContentColumnContainer}>
          <Typography variant="h2" color="textPrimary">
            {product.name}
          </Typography>
          <Typography variant="caption">Last Updated</Typography>
          <Typography variant="caption">{lastUpdated}</Typography>
        </div>
        {props.currentQuantity !== undefined && (
          <Typography align="right" variant="body2">{`${currentQuantity} ${product.unit}(s)`}</Typography>
        )}
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

export default InventoryInfo;
