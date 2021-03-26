import { createStyles, Fab, Theme, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { InventoryRecord, SiteRecord } from '../../lib/airtable/interface';
import { setCurrentInventoryIdInRedux } from '../../lib/redux/inventoryData';
import { EMPTY_SITE_INVENTORY_DATA, SiteInventoryData } from '../../lib/redux/inventoryDataSlice';
import { RootState } from '../../lib/redux/store';
import InventoryCard from './components/InventoryCard';

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      color: 'white',
    },
});

interface InventoryProps extends RouteComponentProps {
  classes: { fab: string };
  currentSite: SiteRecord;
  siteInventoryData: SiteInventoryData;
}

// TODO @wangannie: address empty state
function InventoryMain (props: InventoryProps) {
    const { classes, siteInventoryData } = props;
    return (
      <BaseScreen title="Inventory">
        <BaseScrollView>
          <Link to={'/inventory/purchase-requests'}>
            <Button label="Purchase Requests"/>
          </Link>
          {siteInventoryData.siteInventory.map((inventory: InventoryRecord) =>  (
            <Link key={inventory.id} to={{ pathname: `/inventory/item`}} onClick={() => setCurrentInventoryIdInRedux(inventory.id)}>
              <InventoryCard key={inventory.id} inventory={inventory}/>
            </Link>
          ))}
        </BaseScrollView>
        <Link to={'/inventory/create'}>
          <Fab color='primary' aria-label='add inventory' className={classes.fab} size='medium'>
            <AddIcon fontSize="large"/>
          </Fab>
        </Link>
      </BaseScreen>
    );
}

const mapStateToProps = (state: RootState) => ({
  siteInventoryData: state.inventoryData.sitesInventory[state.siteData.currentSite?.id || ""] || EMPTY_SITE_INVENTORY_DATA,
});

export default connect(mapStateToProps)(withStyles(styles)(InventoryMain));
