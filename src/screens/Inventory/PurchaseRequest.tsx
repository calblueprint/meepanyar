import { IconButton } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import TextField from '../../components/TextField';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { selectProductByInventoryId } from '../../lib/redux/inventoryData';
import { EMPTY_PRODUCT, EMPTY_PURCHASE_REQUEST, PurchaseRequestStatus } from '../../lib/redux/inventoryDataSlice';
import { RootState } from '../../lib/redux/store';
import { getUserId, selectCurrentUserIsAdmin } from '../../lib/redux/userData';
import { getInventoryLastUpdated, reviewPurchaseRequest } from '../../lib/utils/inventoryUtils';
import InventoryInfo from './components/InventoryInfo';
import { getPurchaseRequestStatusIcon } from './components/PurchaseRequestCard';

const styles = (theme: Theme) =>
  createStyles({
    imageContainer: {
      border: `3.5px solid ${theme.palette.divider}`,
      radius: 6,
      padding: 0,
      width: '100%',
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(3),
    },
    reviewButtonsContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  });

interface PurchaseRequestsProps extends RouteComponentProps {
  classes: { imageContainer: string; headerContainer: string; reviewButtonsContainer: string };
  location: any;
}

function PurchaseRequest(props: PurchaseRequestsProps) {
  const { classes } = props;
  const history = useHistory();
  const purchaseRequest: PurchaseRequestRecord = props.location.state?.purchaseRequest || EMPTY_PURCHASE_REQUEST;
  const product =
    useSelector((state: RootState) => selectProductByInventoryId(state, purchaseRequest.inventoryId)) || EMPTY_PRODUCT;
  const userIsAdmin = useSelector(selectCurrentUserIsAdmin);

  // If no purchase request was passed in (i.e. reaching this URL directly), redirect to InventoryMain
  if (!props.location.state?.purchaseRequest || !product) {
    return <Redirect to={'/inventory'} />;
  }

  const handleSubmit = (purchaseRequest: PurchaseRequestRecord, approved: boolean) => {
    reviewPurchaseRequest(purchaseRequest, approved, getUserId());
    history.goBack();
  };

  return (
    <BaseScreen title="Inventory Receipt" leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.headerContainer}>
          <InventoryInfo
            productId={product.id}
            lastUpdated={getInventoryLastUpdated(purchaseRequest.inventoryId)}
            outlined
          />
          {userIsAdmin && purchaseRequest.status == PurchaseRequestStatus.PENDING ? (
            <div className={classes.reviewButtonsContainer}>
              <IconButton onClick={() => handleSubmit(purchaseRequest, false)}>
                {getPurchaseRequestStatusIcon(PurchaseRequestStatus.DENIED)}
              </IconButton>
              <IconButton onClick={() => handleSubmit(purchaseRequest, true)}>
                {getPurchaseRequestStatusIcon(PurchaseRequestStatus.APPROVED)}
              </IconButton>
            </div>
          ) : (
            <IconButton onClick={() => alert('NO EDIT YET')}>
              {getPurchaseRequestStatusIcon(purchaseRequest.status)}
            </IconButton>
          )}
        </div>
        <TextField
          label={'Amount Purchased'}
          unit={product.unit}
          disabled
          id={'amount-purchased'}
          value={purchaseRequest.amountPurchased}
        />
        <TextField
          label={'Amount Spent'}
          currency
          disabled
          id={'amount-spent'}
          value={purchaseRequest.amountSpent}
        />
        <TextField label={'Notes'} disabled id={'notes'} value={purchaseRequest.notes || 'None'} />
        {/* TODO: lookup user name by id */}
        <TextField label={'Submitted By'} disabled id={'submitted-by'} value={purchaseRequest.requesterId} />
        {purchaseRequest.receipt && (
          <img className={classes.imageContainer} src={purchaseRequest.receipt[0].url} alt="receipt" />
        )}
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(PurchaseRequest);
