import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { ProductRecord, PurchaseRequestRecord } from '../../lib/airtable/interface';
import { reviewPurchaseRequest } from '../../lib/airtable/request';
import { getProductByInventoryId } from '../../lib/redux/inventoryData';
import { PurchaseRequestStatus } from '../../lib/redux/inventoryDataSlice';
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
  product: ProductRecord;
}


function PurchaseRequest (props: PurchaseRequestsProps) {
  const { classes, product } = props;
  const purchaseRequest: PurchaseRequestRecord = props.location.state.purchaseRequest;
  const history = useHistory();

    // TODO: rename approvedAt to reviewedAt
  const handleSubmit = (purchaseRequest: PurchaseRequestRecord, approved: boolean) => {
    // Make a deep copy of the existing purchase request record
    const reviewedPurchaseRequest = JSON.parse(JSON.stringify(purchaseRequest));
    reviewedPurchaseRequest.status = approved ? PurchaseRequestStatus.Approved : PurchaseRequestStatus.Denied;
    reviewedPurchaseRequest.reviewerId = getUserId();
    reviewedPurchaseRequest.approvedAt = moment().toISOString();
    reviewPurchaseRequest(reviewedPurchaseRequest);
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
          {/* TODO: lookup user by id */}
          {/* TODO: Add image */}
          {purchaseRequest.status == PurchaseRequestStatus.Pending &&
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

const mapStateToProps = (state: RootState, ownProps: { location: { state: { purchaseRequest: { inventoryId: string; }; }; }; }) => ({
    product: getProductByInventoryId(ownProps.location.state.purchaseRequest.inventoryId),
});

export default connect(mapStateToProps)(withStyles(styles)(PurchaseRequest));
