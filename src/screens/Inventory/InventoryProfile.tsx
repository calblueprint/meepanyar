import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { InventoryRecord, ProductRecord, SiteRecord } from '../../lib/airtable/interface';
import { ProductIdString } from '../../lib/redux/inventoryDataSlice';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { RootState } from '../../lib/redux/store';


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
  currentSite: SiteRecord;
  location: any;
  products: Record<ProductIdString, ProductRecord>;
}
const getPurchaseRequestButton = (inventory: InventoryRecord) => {
  return (
    <Link to={{ pathname: `purchase-requests/create`, state: { inventory } }}> 
      <Button label={"Purchase"}>
        Add Payment
      </Button>
    </Link>
  );
};

function InventoryProfile(props: InventoryProps) {
  const { classes, products } = props;
  const inventoryItem: InventoryRecord = props.location.state.inventoryItem;

  return (
    <BaseScreen leftIcon="backNav" title={products[inventoryItem.productId].name}>
      <BaseScrollView>
        <div className={classes.content}>
          {getPurchaseRequestButton(inventoryItem)}
          <Typography variant="h1">{`${inventoryItem.currentQuantity} ${products[inventoryItem.productId].unit}`}</Typography>
          <div className={classes.section}>
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite || EMPTY_SITE,
  products: state.inventoryData.products || {}
});

export default connect(mapStateToProps)(withStyles(styles)(InventoryProfile));
