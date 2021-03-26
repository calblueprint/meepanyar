import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { InventoryRecord } from '../../lib/airtable/interface';
import { currentInventoryProductSelector, currentInventorySelector } from '../../lib/redux/inventoryDataSlice';
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

const getPurchaseRequestButton = (inventory: InventoryRecord) => (
  <Link to={{ pathname: `purchase-requests/create`, state: { inventory } }}> 
    <Button label={"Purchase"}/>
  </Link>
)

function InventoryProfile(props: InventoryProps) {
  const { classes } = props;
  const inventory = useSelector(currentInventorySelector);
  const product = useSelector(currentInventoryProductSelector);

  return (
    <BaseScreen leftIcon="backNav" title={product.name}>
      <BaseScrollView>
        <div className={classes.content}>
          <InventoryInfo 
            productId={inventory.productId} 
            lastUpdated={getInventoryLastUpdated(inventory)} 
            currentQuantity={inventory.currentQuantity}
          />
          {getPurchaseRequestButton(inventory)}
          <div className={classes.section}>
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(InventoryProfile);
