import { Card, CardActions, IconButton, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import { connect } from 'react-redux';
import { InventoryRecord, ProductRecord } from '../../../lib/airtable/interface';
import { ProductIdString } from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';
import { lastUpdated } from '../../../lib/utils/inventoryUtils';

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
  inventory: InventoryRecord;
  classes: { arrow: string; cardContent: string; cardContainer: string; };
  products: Record<ProductIdString, ProductRecord>;
}

function InventoryCard(props: InventoryCardProps) {
  const { classes, inventory, products} = props;
  return (
    <Card className={classes.cardContainer}>
      <div className={classes.cardContent}>
        <Typography variant="body1">{products[inventory.productId]?.name}</Typography>
        <Typography variant="body1" color="textSecondary">{`Last Updated: ${lastUpdated(inventory)}`} </Typography>
      </div>
      <CardActions>
        <IconButton size="small">
          <ArrowForwardIosIcon className={classes.arrow} fontSize="small"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => ({
  products: state.inventoryData.products || {}
});

export default connect(mapStateToProps)(withStyles(styles)(InventoryCard));
