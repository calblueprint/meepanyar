import { Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SyncIcon from '@material-ui/icons/Sync';
import React from 'react';
import { useSelector } from 'react-redux';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';
import { EMPTY_PRODUCT, selectProductById } from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';
import { isOfflineId } from '../../../lib/utils/offlineUtils';

const styles = (theme: Theme) =>
  createStyles({
    cardContent: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      paddingRight: theme.spacing(1),
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
    headingRowContainer: {
      display: 'inline-flex',
    },
    syncIcon: {
      marginLeft: theme.spacing(1),
    },
  });

interface InventoryCardProps {
  classes: {
    leftContent: string;
    cardContent: string;
    cardContainer: string;
    syncIcon: string;
    headingRowContainer: string;
  };
  lastUpdated: string;
  productId: string;
  currentQuantity: number;
  inventoryId: string;
}

function InventoryCard(props: InventoryCardProps) {
  const intl = useInternationalization();
  const { classes, lastUpdated, productId, currentQuantity, inventoryId } = props;
  const product = useSelector((state: RootState) => selectProductById(state, productId)) || EMPTY_PRODUCT;

  return (
    <Card variant="outlined" className={classes.cardContainer}>
      <CardContent className={classes.cardContent}>
        <div className={classes.leftContent}>
          <div className={classes.headingRowContainer}>
            <Typography variant="h2">{product.name}</Typography>
            {isOfflineId(inventoryId) && <SyncIcon fontSize="small" className={classes.syncIcon} />}
          </div>
          <Typography variant="body1" color="textSecondary">
            {`${intl(words.last_updated_date, ' ')}: ${lastUpdated}`}{' '}
          </Typography>
        </div>
        <Typography variant="h2">{`${currentQuantity} ${product.unit}(${intl(words.s)})`}</Typography>
      </CardContent>
      <CardActions>
        <IconButton edge="end" size="small">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(InventoryCard);
