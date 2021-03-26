import { createStyles, Theme, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { currentSitePurchaseRequestsSelector } from '../../lib/redux/inventoryData';
import { PurchaseRequestStatus, SiteInventoryData } from '../../lib/redux/inventoryDataSlice';
import PurchaseRequestCard from './components/PurchaseRequestCard';

const styles = (theme: Theme) =>
  createStyles({
});

interface PurchaseRequestsProps extends RouteComponentProps {
  classes: {};
  siteInventoryData: SiteInventoryData;
}

// TODO @wangannie: address empty state
function PurchaseRequests (props: PurchaseRequestsProps) {
    const { classes } = props;
    const purchaseRequests = useSelector(currentSitePurchaseRequestsSelector);

    const getPurchaseRequestsSection = (status: PurchaseRequestStatus) => (
      <div>
        <Typography variant="body1">{status}</Typography>
        {purchaseRequests.filter(pr => pr.status == status).map((purchaseRequest: PurchaseRequestRecord) =>  (
          <Link key={purchaseRequest.id} to={{ pathname: `/inventory/purchase-requests/purchase-request`, state: { purchaseRequest }}}>
            <PurchaseRequestCard 
              key={purchaseRequest.id} 
              status={purchaseRequest.status}
              amountPurchased={purchaseRequest.amountPurchased}
              createdAt={purchaseRequest.createdAt}
              requesterId={purchaseRequest.requesterId}
              inventoryId={purchaseRequest.inventoryId}
            />
          </Link>
        ))}
      </div>
    );

    return (
      <BaseScreen title="Purchase Requests">
        <BaseScrollView>
          <Link to={'/inventory'}>
            <Button label="Back to Inventory"/>
          </Link>
          {getPurchaseRequestsSection(PurchaseRequestStatus.PENDING)}
          {getPurchaseRequestsSection(PurchaseRequestStatus.APPROVED)}
          {getPurchaseRequestsSection(PurchaseRequestStatus.DENIED)}
        </BaseScrollView>
      </BaseScreen>
    );
}

export default withStyles(styles)(PurchaseRequests);
