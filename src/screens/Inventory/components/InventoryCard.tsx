import { Card, CardActions, IconButton, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import { useSelector } from 'react-redux';
import { EMPTY_PRODUCT, selectProductById } from '../../../lib/redux/inventoryDataSlice';
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
  });
  
interface InventoryCardProps {
  classes: { arrow: string; cardContent: string; cardContainer: string; };
  lastUpdated: string,
  productId: string,
}

function InventoryCard(props: InventoryCardProps) {
  const { classes, lastUpdated, productId } = props;
  const product = useSelector((state: RootState) => selectProductById(state, productId)) || EMPTY_PRODUCT;

  return (
    <Card className={classes.cardContainer}>
      <div className={classes.cardContent}>
        <Typography variant="body1">{product.name}</Typography>
        <Typography variant="body1" color="textSecondary">{`Last Updated: ${lastUpdated}`} </Typography>
      </div>
      <CardActions>
        <IconButton size="small">
          <ArrowForwardIosIcon className={classes.arrow} fontSize="small"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(InventoryCard);
