import { createStyles, Theme, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { PurchaseRequestRecord } from '../../lib/airtable/interface';
import { EMPTY_SITE_INVENTORY_DATA, PurchaseRequestStatus, SiteInventoryData } from '../../lib/redux/inventoryDataSlice';
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
    return (
      <BaseScreen title="Purchase Requests">
        <BaseScrollView>
          <Link to={'/inventory'}>
            <Button label="Back to Inventory"/>
          </Link>
          <Typography variant="h3">Pending Review</Typography>
          {siteInventoryData.purchaseRequests.filter(pr => pr.status == PurchaseRequestStatus.Pending).map((purchaseRequest: PurchaseRequestRecord) =>  (
            <Link key={purchaseRequest.id} to={{ pathname: `/inventory/purchase-requests/purchase-request`, state: { purchaseRequest: purchaseRequest }}}>
              <PurchaseRequestCard key={purchaseRequest.id} purchaseRequest={purchaseRequest}/>
            </Link>
          ))}
          <Typography variant="h3">Approved</Typography>
          {siteInventoryData.purchaseRequests.filter(pr => pr.status == PurchaseRequestStatus.Approved).map((purchaseRequest: PurchaseRequestRecord) =>  (
            <Link key={purchaseRequest.id} to={{ pathname: `/inventory/purchase-requests/purchase-request`, state: { purchaseRequest: purchaseRequest }}}>
              <PurchaseRequestCard key={purchaseRequest.id} purchaseRequest={purchaseRequest}/>
            </Link>
          ))}
          <Typography variant="h3">Denied</Typography>
          {siteInventoryData.purchaseRequests.filter(pr => pr.status !== PurchaseRequestStatus.Denied).map((purchaseRequest: PurchaseRequestRecord) =>  (
            <Link key={purchaseRequest.id} to={{ pathname: `/inventory/purchase-requests/purchase-request`, state: { purchaseRequest: purchaseRequest }}}>
              <PurchaseRequestCard key={purchaseRequest.id} purchaseRequest={purchaseRequest}/>
            </Link>
          ))}
        </BaseScrollView>
      </BaseScreen>
    );
}

const mapStateToProps = (state: RootState) => ({
  siteInventoryData: state.inventoryData.sitesInventory[state.siteData.currentSite?.id || ""] || EMPTY_SITE_INVENTORY_DATA,
});

export default connect(mapStateToProps)(withStyles(styles)(PurchaseRequests));
