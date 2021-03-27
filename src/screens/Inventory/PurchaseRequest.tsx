import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { updatePurchaseRequest } from '../../lib/airtable/request';
import { updatePurchaseRequestInRedux } from '../../lib/redux/inventoryData';
import { EMPTY_PRODUCT, PurchaseRequestStatus, selectCurrentSiteInventoryById, selectProductById } from '../../lib/redux/inventoryDataSlice';
import { RootState } from '../../lib/redux/store';
import { getUserId } from '../../lib/redux/userData';


const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    section: {
      marginTop: '30px',
    },
  });

interface PurchaseRequestsProps extends RouteComponentProps {
  classes: { content: string; section: string; };
  location: any;
  // product: ProductRecord;
}


function PurchaseRequest (props: PurchaseRequestsProps) {
  const { classes } = props;
  const purchaseRequest: PurchaseRequestRecord = props.location.state.purchaseRequest;
  const product = useSelector((state: RootState) => selectProductById(state, selectCurrentSiteInventoryById(state, purchaseRequest.inventoryId)?.productId || ""))|| EMPTY_PRODUCT;
  const history = useHistory();

  // TODO (with schema update): rename approvedAt to reviewedAt
  const handleSubmit = (purchaseRequest: PurchaseRequestRecord, approved: boolean) => {
    const reviewData = {
      reviewerId: getUserId(),
      approvedAt: moment().toISOString(),
      status: approved ? PurchaseRequestStatus.APPROVED : PurchaseRequestStatus.DENIED,
    }
    updatePurchaseRequest(purchaseRequest.id, reviewData);
    updatePurchaseRequestInRedux({id: purchaseRequest.id, ...reviewData});
    history.goBack();
  }

  return (
    <BaseScreen leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.content}>
          <Typography variant="h3">{`Purchase Request for ${product.name}`}</Typography>
          <Typography variant="body1">{`Request status: ${purchaseRequest.status}`}</Typography>
          <Typography variant="body1">{`Amount purchased ${purchaseRequest.amountPurchased} ${product.unit}(s)`}</Typography>
          <Typography variant="body1">{`Amount spent ${purchaseRequest.amountSpent} ks`}</Typography>
          <Typography variant="body1">{`Created at ${purchaseRequest.createdAt}`}</Typography>
          <Typography variant="body1">{`Submitted by ${purchaseRequest.requesterId}`}</Typography>
          {purchaseRequest.notes && <Typography variant="body1">{`Notes: ${purchaseRequest.notes}`}</Typography>}
          {/* TODO: admins lookup user info by id */}
          {/* TODO: Add image */}
          {purchaseRequest.status == PurchaseRequestStatus.PENDING &&
            <div>
              <Button onClick={() => handleSubmit(purchaseRequest, true)} label={"Approve"}/>
              <Button onClick={() => handleSubmit(purchaseRequest, false)} label={"Deny"}/>
            </div>
          }
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(PurchaseRequest);
