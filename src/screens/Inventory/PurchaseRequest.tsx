import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { updatePurchaseRequest } from '../../lib/airtable/request';
import { formatDateStringToLocal } from '../../lib/moment/momentUtils';
import { selectProductByInventoryId, updatePurchaseRequestInRedux } from '../../lib/redux/inventoryData';
import {
  EMPTY_PRODUCT,
  EMPTY_PURCHASE_REQUEST,
  PurchaseRequestStatus
} from '../../lib/redux/inventoryDataSlice';
import { RootState } from '../../lib/redux/store';
import { getUserId, selectCurrentUserIsAdmin } from '../../lib/redux/userData';
import { selectSiteUserById } from '../../lib/redux/userDataSlice';

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
  const requester = useSelector((state: RootState) => selectSiteUserById(state, purchaseRequest.requesterId));


  // If no purchase request was passed in (i.e. reaching this URL directly), redirect to InventoryMain
  if (!props.location.state?.purchaseRequest || !product) {
    return <Redirect to={'/inventory'} />;
  }

  const handleSubmit = (purchaseRequest: PurchaseRequestRecord, approved: boolean) => {
    const reviewData = {
      reviewerId: getUserId(),
      reviewedAt: moment().toISOString(),
      status: approved ? PurchaseRequestStatus.APPROVED : PurchaseRequestStatus.DENIED,
    };
    updatePurchaseRequest(purchaseRequest.id, reviewData);
    updatePurchaseRequestInRedux({ id: purchaseRequest.id, ...reviewData });
    history.goBack();
  };

  return (
    <BaseScreen title="Inventory Receipt" leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.content}>
          <Typography variant="h3">{`Purchase Request for ${product.name}`}</Typography>
          <Typography variant="body1">{`Request status: ${purchaseRequest.status}`}</Typography>
          <Typography variant="body1">{`Amount purchased ${purchaseRequest.amountPurchased} ${product.unit}(s)`}</Typography>
          <Typography variant="body1">{`Amount spent ${purchaseRequest.amountSpent} ks`}</Typography>
          <Typography variant="body1">{`Created at ${formatDateStringToLocal(purchaseRequest.createdAt)}`}</Typography>
          <Typography variant="body1">{`Submitted by ${requester?.username || purchaseRequest.requesterId}`}</Typography>
          {purchaseRequest.notes && <Typography variant="body1">{`Notes: ${purchaseRequest.notes}`}</Typography>}
          {purchaseRequest.receipt && <img className={classes.imageContainer} src={purchaseRequest.receipt[0].url} alt="receipt"/> }
          {userIsAdmin && purchaseRequest.status == PurchaseRequestStatus.PENDING && (
            <div>
              <Button onClick={() => handleSubmit(purchaseRequest, true)} label={'Approve'} />
              <Button onClick={() => handleSubmit(purchaseRequest, false)} label={'Deny'} />
            </div>
          )}
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(PurchaseRequest);
