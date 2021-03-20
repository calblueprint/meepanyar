import { createStyles, Fab, Theme, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import InventoryCard from '../../components/Inventory/InventoryCard';
import { InventoryRecord } from '../../lib/airtable/interface';
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
  classes: { fab: string};
  siteInventory: InventoryRecord[];
}

function InventoryMain (props: InventoryProps) {
    const { classes, siteInventory } = props;
    return (
      <BaseScreen title="Inventory">
        <BaseScrollView>
        {
          // TODO: add key
          siteInventory.map((inventory) => (
            <Link to={{ pathname: '/inventory/item', state: { inventoryItem: inventory }}}>
              <InventoryCard inventoryItem={inventory}/>
            </Link>
          ))
        }
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
  siteInventory: state.inventoryData.siteInventory || []
});

export default connect(mapStateToProps)(withStyles(styles)(InventoryMain));
