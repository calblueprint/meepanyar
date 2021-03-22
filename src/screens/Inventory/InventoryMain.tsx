import { createStyles, Fab, Theme, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import InventoryCard from '../../components/Inventory/InventoryCard';
import { InventoryRecord, SiteRecord } from '../../lib/airtable/interface';
import { EMPTY_SITE_INVENTORY_DATA, SiteInventoryData } from '../../lib/redux/inventoryDataSlice';
import { RootState } from '../../lib/redux/store';

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
  currentSiteInventory: SiteInventoryData;
}

// TODO @wangannie: address empty state
function InventoryMain (props: InventoryProps) {
    const { classes, currentSiteInventory } = props;
    return (
      <BaseScreen title="Inventory">
        <BaseScrollView>
          {currentSiteInventory.siteInventory.map((inventory: InventoryRecord) =>  (
            <Link key={inventory.id} to={{ pathname: `/inventory/item`, state: { inventoryItem: inventory }}}>
              <InventoryCard key={inventory.id} inventoryItem={inventory}/>
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
  currentSiteInventory: state.inventoryData.sitesInventory[state.siteData.currentSite?.id || ""] || EMPTY_SITE_INVENTORY_DATA,
});

export default connect(mapStateToProps)(withStyles(styles)(InventoryMain));
