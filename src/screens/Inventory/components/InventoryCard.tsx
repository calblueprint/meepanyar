import { Card, CardActions, IconButton, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import { connect } from 'react-redux';
import { InventoryRecord, ProductRecord } from '../../../lib/airtable/interface';
import { getProductByInventoryId } from '../../../lib/redux/inventoryData';
import { RootState } from '../../../lib/redux/store';
import { getInventoryLastUpdated } from '../../../lib/utils/inventoryUtils';

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
  inventory: InventoryRecord;
  product: ProductRecord;
}

function InventoryCard(props: InventoryCardProps) {
  const { classes, product, inventory } = props;

  return (
    <Card className={classes.cardContainer}>
      <div className={classes.cardContent}>
        <Typography variant="body1">{product.name}</Typography>
        <Typography variant="body1" color="textSecondary">{`Last Updated: ${getInventoryLastUpdated(inventory)}`} </Typography>
      </div>
      <CardActions>
        <IconButton size="small">
          <ArrowForwardIosIcon className={classes.arrow} fontSize="small"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state: RootState, ownProps: { inventory: InventoryRecord }) => ({
  product: getProductByInventoryId(ownProps.inventory.id),
});

export default connect(mapStateToProps)(withStyles(styles)(InventoryCard));
