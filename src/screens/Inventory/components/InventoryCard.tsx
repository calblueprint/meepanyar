import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import { useSelector } from 'react-redux';
import { EMPTY_PRODUCT, selectProductById } from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';

const styles = (theme: Theme) =>
  createStyles({
    cardContent: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
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
  
interface InventoryCardProps {
  classes: { leftContent: string; cardContent: string; cardContainer: string; };
  lastUpdated: string,
  productId: string,
  currentQuantity: number,
}

function InventoryCard(props: InventoryCardProps) {
  const { classes, lastUpdated, productId, currentQuantity } = props;
  const product = useSelector((state: RootState) => selectProductById(state, productId)) || EMPTY_PRODUCT;

  return (
    <Card variant="outlined" className={classes.cardContainer}>
      <CardContent className={classes.cardContent}>
        <div className={classes.leftContent}>
          <Typography  variant="h2">{product.name}</Typography>
          <Typography variant="body1" color="textSecondary">{`Last Updated: ${lastUpdated}`} </Typography>
        </div>
        <Typography variant="h2">{currentQuantity}</Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small">
          <ArrowForwardIosIcon fontSize="small"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(InventoryCard);
