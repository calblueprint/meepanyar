import { createStyles, Theme, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { PurchaseRequestRecord, SiteRecord } from '../../lib/airtable/interface';
import { EMPTY_SITE_INVENTORY_DATA, SiteInventoryData } from '../../lib/redux/inventoryDataSlice';
import { RootState } from '../../lib/redux/store';
import PurchaseRequestCard from './components/PurchaseRequestCard';

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      color: 'white',
    },
});

interface PurchaseRequestsProps extends RouteComponentProps {
  classes: { fab: string };
  currentSite: SiteRecord;
  currentSiteInventory: SiteInventoryData;
}

// TODO @wangannie: address empty state
function PurchaseRequests (props: PurchaseRequestsProps) {
    const { classes, currentSiteInventory } = props;
    return (
      <BaseScreen title="Purchase Requests">
        <BaseScrollView>
          <Link to={'/inventory'}>
            <Button label="Back to Inventory"/>
          </Link>
          {currentSiteInventory.purchaseRequests.map((purchaseRequest: PurchaseRequestRecord) =>  (
            <Link key={purchaseRequest.id} to={{ pathname: `/inventory/purchase-requests/purchase-request`, state: { purchaseRequest: purchaseRequest }}}>
              <PurchaseRequestCard key={purchaseRequest.id} purchaseRequest={purchaseRequest}/>
            </Link>
          ))}
        </BaseScrollView>
      </BaseScreen>
    );
}

const mapStateToProps = (state: RootState) => ({
  currentSiteInventory: state.inventoryData.sitesInventory[state.siteData.currentSite?.id || ""] || EMPTY_SITE_INVENTORY_DATA,
});

export default connect(mapStateToProps)(withStyles(styles)(PurchaseRequests));
