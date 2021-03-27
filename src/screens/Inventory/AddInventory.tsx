import { createStyles, FormControl, TextField as MaterialTextField, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { InventoryRecord, ProductRecord, SiteRecord } from '../../lib/airtable/interface';
import { createInventory } from '../../lib/airtable/request';
import { EMPTY_INVENTORY, EMPTY_SITE_INVENTORY_DATA, ProductIdString, SiteIdString, SiteInventoryData } from '../../lib/redux/inventoryDataSlice';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { RootState } from '../../lib/redux/store';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    formControl: {
      width: '100%',
    },
  });

interface AddInventoryProps extends RouteComponentProps {
  classes: { content: string, formControl: string};
  location: any;
  currentSite: SiteRecord;
  products: Record<ProductIdString, ProductRecord>;
  userId: string;
  sitesInventory: Record<SiteIdString, SiteInventoryData>;
  currentSiteInventory: SiteInventoryData;
}


function AddInventory(props: AddInventoryProps) {
  const { classes, currentSite, products, userId, currentSiteInventory } = props;
  const history = useHistory();
  // Product IDs for items that the site already has inventory for
  const currentSiteProductIds = currentSiteInventory.siteInventory.map((inventory: InventoryRecord) => inventory.productId);
  // Filter to only show products that the site doesn't already have
  const productOptions = Object.entries(products).filter(([id, _]) => !currentSiteProductIds.includes(id)).map(item => item[0]);
  
  const [selectedProductId, setSelectedProductId] = useState("");
  const [startingAmount, setStartingAmount] = useState(0);

  // TODO: Add form input validation and error messaging
  const handleSubmit = async (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();

    // Make a deep copy of an empty inventory record
    let inventory = JSON.parse(JSON.stringify(EMPTY_INVENTORY));
    inventory.productId = selectedProductId;
    inventory.siteId = currentSite.id;
    inventory.currentQuantity = startingAmount;
    inventory.periodStartQuantity = startingAmount;
    
    // createInventory returns the inventory item with an id
    inventory = await createInventory(inventory);

    // TODO: @wangannie create inventory update

    // Navigate to new inventory item's profile page
    history.replace(`item`, { inventoryItem: inventory });
  }
  const handleSelectItem = (event: React.ChangeEvent<{ }>, value: string | null) => {
      setSelectedProductId(value || "");
  }

  const handleStartingAmountInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStartingAmount(parseFloat(event.target.value as string));
  }

  return (
    <BaseScreen title="New Inventory" leftIcon="backNav">
      <form noValidate className={classes.content} onSubmit={() => false}>
        <FormControl variant="outlined" className={classes.formControl}>
          <Autocomplete
            id = "select-item"
            options = {productOptions}
            style = {{ marginBottom: 24 }}
            getOptionLabel={(productId) => `${products[productId]?.name} (${products[productId]?.unit})`}
            renderInput={(params) => <MaterialTextField {...params} label="Item" variant="outlined"/>}
            onChange={handleSelectItem}
          />
        </FormControl>
        <TextField label={'Starting Amount'} id={'starting-amount'} primary={true} onChange={handleStartingAmountInput} />
        <Button label={'Add'} onClick={handleSubmit} />
      </form>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite || EMPTY_SITE,
  products: state.inventoryData.products || {},
  userId: state.userData.user?.id || '',
  currentSiteInventory: state.inventoryData.sitesInventory[state.siteData.currentSite?.id || ""] || EMPTY_SITE_INVENTORY_DATA,
});

export default connect(mapStateToProps)(withStyles(styles)(AddInventory));
