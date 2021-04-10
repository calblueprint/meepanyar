import { IconButton } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import TextField from '../../components/TextField';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { selectProductByInventoryId } from '../../lib/redux/inventoryData';
import {
  EMPTY_PRODUCT,
  EMPTY_PURCHASE_REQUEST,
  PurchaseRequestStatus
} from '../../lib/redux/inventoryDataSlice';
import { RootState } from '../../lib/redux/store';
import { getUserId, selectCurrentUserIsAdmin } from '../../lib/redux/userData';
import { reviewPurchaseRequest } from '../../lib/utils/inventoryUtils';
import { getPurchaseRequestStatusIcon } from './components/PurchaseRequestCard';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    section: {
      marginTop: '30px',
    },
    imageContainer: {
      border: `3.5px solid ${theme.palette.divider}`,
      radius: '6px',
      padding: 0,
      width: '100%',
    },
  });

interface PurchaseRequestsProps extends RouteComponentProps {
  classes: { content: string; section: string, imageContainer: string };
  location: any;
}

function PurchaseRequest(props: PurchaseRequestsProps) {
  const { classes } = props;
  const history = useHistory();
  const purchaseRequest: PurchaseRequestRecord = props.location.state?.purchaseRequest || EMPTY_PURCHASE_REQUEST;
  const product = useSelector((state: RootState) => selectProductByInventoryId(state, purchaseRequest.inventoryId)) || EMPTY_PRODUCT;
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
        <div className={classes.content}>
          <Typography variant="h3">{`Purchase Request for ${product.name}`}</Typography>
          {userIsAdmin && purchaseRequest.status == PurchaseRequestStatus.PENDING && (
            <div>
              <IconButton onClick={() => handleSubmit(purchaseRequest, true)} >{getPurchaseRequestStatusIcon(PurchaseRequestStatus.APPROVED)}</IconButton>
              <IconButton onClick={() => handleSubmit(purchaseRequest, false)}>{getPurchaseRequestStatusIcon(PurchaseRequestStatus.DENIED)}</IconButton>
            </div>
          )}
          <TextField label={'Amount Purchased'}  unit={product.unit} disabled id={'amount-purchased'} value={purchaseRequest.amountPurchased} />
          <TextField label={'Amount Spent'}  unit={'kS'} disabled id={'amount-spent'} value={purchaseRequest.amountSpent} />
          <TextField label={'Notes'} disabled id={'notes'} value={purchaseRequest.notes || "None"} />
          <TextField label={'Submitted By'} disabled id={'submitted-by'} value={purchaseRequest.requesterId} />
          {purchaseRequest.receipt && <img className={classes.imageContainer} src={purchaseRequest.receipt[0].url} alt="receipt"/> }
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(PurchaseRequest);
