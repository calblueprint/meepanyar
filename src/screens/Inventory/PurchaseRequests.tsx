import { createStyles, Theme, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { EMPTY_SITE_INVENTORY_DATA, PurchaseRequestStatus, SiteInventoryData } from '../../lib/redux/inventoryDataSlice';
import { getCurrentSite } from '../../lib/redux/siteData';
import { RootState } from '../../lib/redux/store';
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
    const { classes, siteInventoryData } = props;

    const getPurchaseRequestsSection = (status: PurchaseRequestStatus) => (
      <div>
        <Typography variant="body1">{status}</Typography>
        {siteInventoryData.purchaseRequests.filter(pr => pr.status == status).map((purchaseRequest: PurchaseRequestRecord) =>  (
          <Link key={purchaseRequest.id} to={{ pathname: `/inventory/purchase-requests/purchase-request`, state: { purchaseRequest }}}>
            <PurchaseRequestCard key={purchaseRequest.id} purchaseRequest={purchaseRequest}/>
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

const mapStateToProps = (state: RootState) => ({
  siteInventoryData: state.inventoryData.sitesInventory[getCurrentSite().id] || EMPTY_SITE_INVENTORY_DATA,
});

export default connect(mapStateToProps)(withStyles(styles)(PurchaseRequests));
