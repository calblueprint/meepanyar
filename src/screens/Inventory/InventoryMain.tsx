import { createStyles, Fab, Theme, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { InventoryRecord } from '../../lib/airtable/interface';
import { currentSiteInventorySelector, setCurrentInventoryIdInRedux } from '../../lib/redux/inventoryData';
import { getInventoryLastUpdated } from '../../lib/utils/inventoryUtils';
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
}

// TODO @wangannie: address empty state
function InventoryMain (props: InventoryProps) {
    const { classes } = props;
    const siteInventory = useSelector(currentSiteInventorySelector);
    return (
      <BaseScreen title="Inventory">
        <BaseScrollView>
          <Link to={'/inventory/purchase-requests'}>
            <Button label="Purchase Requests"/>
          </Link>
          {siteInventory.map((inventory: InventoryRecord) =>  (
            <Link key={inventory.id} to={'/inventory/item'} onClick={() => setCurrentInventoryIdInRedux(inventory.id)}>
              <InventoryCard key={inventory.id} productId={inventory.productId} lastUpdated={getInventoryLastUpdated(inventory)}/>
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

export default withStyles(styles)(InventoryMain);
