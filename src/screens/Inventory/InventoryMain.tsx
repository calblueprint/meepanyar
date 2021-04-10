import {
  AppBar,
  Badge,
  createStyles,
  Fab,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import ScrollView from '../../components/BaseComponents/ScrollView';
import Button from '../../components/Button';
import { InventoryRecord } from '../../lib/airtable/interface';
import { setCurrentInventoryIdInRedux } from '../../lib/redux/inventoryData';
import { selectAllCurrentSiteInventoryArray } from '../../lib/redux/inventoryDataSlice';
import { getInventoryLastUpdated } from '../../lib/utils/inventoryUtils';
import InventoryCard from './components/InventoryCard';

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: 'white',
      marginBottom: theme.spacing(2),
    },
    menuButton: {
      marginLeft: theme.spacing(1),
    },
    bottomToolbar: {
      justifyContent: 'space-between',
    },
    topToolbar: {
      justifyContent: 'flex-end',
      paddingTop: theme.spacing(2),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(10),
      right: theme.spacing(2),
      color: 'white',
    },
  });

interface InventoryProps extends RouteComponentProps {
  classes: {
    fab: string;
    menuButton: string;
    topToolbar: string;
    bottomToolbar: string;
    appBar: string;
  };
}

// TODO @wangannie: address empty state
function InventoryMain(props: InventoryProps) {
  const { classes } = props;
  const siteInventory = useSelector(selectAllCurrentSiteInventoryArray);
  return (
    <div>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar className={classes.topToolbar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Toolbar className={classes.bottomToolbar}>
          <Typography variant="h1">Inventory</Typography>
          <Link to={'/inventory/purchase-requests'}>
            {/* TODO: get # pending purchase requests */}
            <Badge color="error" badgeContent={1}>
              <Button variant="text" label="All Purchases" />
            </Badge>
          </Link>
        </Toolbar>
      </AppBar>
      <ScrollView>
        {siteInventory.map((inventory: InventoryRecord) => (
          <Link key={inventory.id} to={'/inventory/item'} onClick={() => setCurrentInventoryIdInRedux(inventory.id)}>
            <InventoryCard
              currentQuantity={inventory.currentQuantity}
              key={inventory.id}
              productId={inventory.productId}
              lastUpdated={getInventoryLastUpdated(inventory.id)}
            />
          </Link>
        ))}
      </ScrollView>
      <Link to={'/inventory/create'}>
        <Fab color="primary" aria-label="add inventory" className={classes.fab} size="medium">
          <AddIcon fontSize="large" />
        </Fab>
      </Link>
    </div>
  );
}

export default withStyles(styles)(InventoryMain);
