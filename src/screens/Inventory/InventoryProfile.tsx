import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { InventoryRecord, ProductRecord } from '../../lib/airtable/interface';
import { getProductByInventoryId } from '../../lib/redux/inventoryData';
import { RootState } from '../../lib/redux/store';
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
  location: any;
  product: ProductRecord;
}
const getPurchaseRequestButton = (inventory: InventoryRecord) => {
  return (
    <Link to={{ pathname: `purchase-requests/create`, state: { inventory } }}> 
      <Button label={"Purchase"}/>
    </Link>
  );
};

function InventoryProfile(props: InventoryProps) {
  const { classes, product } = props;
  const inventory: InventoryRecord = props.location.state.inventory;

  return (
    <BaseScreen leftIcon="backNav" title={product.name}>
      <BaseScrollView>
        <div className={classes.content}>
          <InventoryInfo product={product} inventory={inventory} />
          {getPurchaseRequestButton(inventory)}
          <div className={classes.section}>
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState, ownProps: { location: { state: { inventory: InventoryRecord }; }; }) => ({
  product: getProductByInventoryId(ownProps.location.state.inventory.id),
});

export default connect(mapStateToProps)(withStyles(styles)(InventoryProfile));
