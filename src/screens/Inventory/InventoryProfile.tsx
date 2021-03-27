import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { currentInventoryProductSelector, currentInventorySelector } from '../../lib/redux/inventoryData';
import { EMPTY_INVENTORY, EMPTY_PRODUCT } from '../../lib/redux/inventoryDataSlice';
import { getInventoryLastUpdated } from '../../lib/utils/inventoryUtils';
import InventoryInfo from './components/InventoryInfo';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    section: {
      marginTop: '30px',
    },
  });

interface InventoryProps extends RouteComponentProps {
  classes: { content: string; section: string; };
}

const getPurchaseRequestButton = () => (
  <Link to={'purchase-requests/create'}> 
    <Button label={"Purchase"}/>
  </Link>
)

function InventoryProfile(props: InventoryProps) {
  const { classes } = props;
  const inventory = useSelector(currentInventorySelector) || EMPTY_INVENTORY;
  const product = useSelector(currentInventoryProductSelector) || EMPTY_PRODUCT;

  return (
    <BaseScreen leftIcon="backNav" title={product.name}>
      <BaseScrollView>
        <div className={classes.content}>
          <InventoryInfo 
            productId={inventory.productId} 
            lastUpdated={getInventoryLastUpdated(inventory)} 
            currentQuantity={inventory.currentQuantity}
          />
          {getPurchaseRequestButton()}
          <div className={classes.section}>
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(InventoryProfile);
