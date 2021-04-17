import { Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { EMPTY_PRODUCT, selectProductById } from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';

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

function PurchaseRequestButton() {
  const intl = useInternationalization(); 
  return (<Link to={'purchase-requests/create'}>
  <Button label={intl(words.inventory_purchase)} />
  </Link>)
};

function UpdateButton() {
  const intl = useInternationalization(); 
  return (<Link to={'updates/create'}>
    <Button variant="outlined" label={intl(words.update)} />
  </Link>)
};

function InventoryInfo(props: InventoryInfoProps) {
  const intl = useInternationalization(); 
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
          <Typography variant="caption">{intl(words.last_updated_date)}</Typography>
          <Typography variant="caption">{lastUpdated}</Typography>
        </div>
        {props.currentQuantity !== undefined && (
          <Typography align="right" variant="body2">{`${currentQuantity} ${product.unit}(${intl(words.s)})`}</Typography>
        )}
      </CardContent>
      {withActions && (
        <CardActions className={classes.cardActions}>
          {UpdateButton()}
          {PurchaseRequestButton()}
        </CardActions>
      )}
    </Card>
  );
}

export default InventoryInfo;
