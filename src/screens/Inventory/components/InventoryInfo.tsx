import { Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import SyncIcon from '@material-ui/icons/Sync';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';
import { EMPTY_PRODUCT, selectProductById } from '../../../lib/redux/inventoryDataSlice';
import { RootState } from '../../../lib/redux/store';
import { isOfflineId } from '../../../lib/utils/offlineUtils';

interface InventoryInfoProps {
  productId: string;
  lastUpdated: string;
  currentQuantity?: number;
  withActions?: boolean;
  inventoryId: string;
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
    headingRowContainer: {
      display: 'inline-flex',
    },
    syncIcon: {
      marginLeft: theme.spacing(1),
    },
  }),
);

function PurchaseRequestButton() {
  const intl = useInternationalization();
  return (
    <Link to={'purchase-requests/create'}>
      <Button label={intl(words.purchase)} />
    </Link>
  );
}

function UpdateButton() {
  const intl = useInternationalization();
  return (
    <Link to={'updates/create'}>
      <Button variant="outlined" label={intl(words.update)} />
    </Link>
  );
}

function InventoryInfo(props: InventoryInfoProps) {
  const intl = useInternationalization();
  const classes = useStyles(props);
  const { productId, lastUpdated, currentQuantity, withActions, inventoryId } = props;
  const product = useSelector((state: RootState) => selectProductById(state, productId)) || EMPTY_PRODUCT;

  return (
    <Card variant="outlined" className={classes.cardContainer}>
      <CardContent className={classes.cardContent}>
        <div className={classes.leftContentColumnContainer}>
          <div className={classes.headingRowContainer}>
            <Typography variant="h2">{product.name}</Typography>
            {isOfflineId(inventoryId) && <SyncIcon fontSize="small" className={classes.syncIcon} />}
          </div>
          <Typography variant="caption">{intl(words.last_updated_date, ' ')}</Typography>
          <Typography variant="caption">{lastUpdated}</Typography>
        </div>
        {props.currentQuantity !== undefined && (
          <Typography align="right" variant="body2">{`${currentQuantity} ${product.unit}(${intl(
            words.s,
          )})`}</Typography>
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
