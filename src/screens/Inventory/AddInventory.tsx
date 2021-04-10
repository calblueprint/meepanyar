import { createStyles, TextField as MaterialTextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { InventoryRecord } from '../../lib/airtable/interface';
import { createInventory, createInventoryUpdateAndUpdateInventory, createProduct } from '../../lib/airtable/request';
import { setCurrentInventoryIdInRedux } from '../../lib/redux/inventoryData';
import {
  EMPTY_INVENTORY,
  EMPTY_PRODUCT,
  selectAllCurrentSiteInventoryArray,
  selectAllProducts
} from '../../lib/redux/inventoryDataSlice';
import { getCurrentSiteId } from '../../lib/redux/siteData';
import { selectCurrentUserId } from '../../lib/redux/userData';

const styles = () =>
  createStyles({
    newProductContainer: {
      flexDirection: 'row',
      display: 'flex',
    },
  });

interface AddInventoryProps extends RouteComponentProps {
  classes: { newProductContainer: string };
}

function AddInventory(props: AddInventoryProps) {
  const { classes } = props;
  const products = useSelector(selectAllProducts);
  const siteInventory = useSelector(selectAllCurrentSiteInventoryArray);
  const userId = useSelector(selectCurrentUserId);
  const history = useHistory();

  // Product IDs for items that the site already has inventory for
  const currentSiteProductIds = siteInventory.map((inventory: InventoryRecord) => inventory.productId);
  // Filter to only show products that the site doesn't already have
  const productOptionIds = Object.entries(products)
    .filter(([id, _]) => !currentSiteProductIds.includes(id))
    .map((item) => item[0]);

  const [selectedProductId, setSelectedProductId] = useState('');
  const [startingAmount, setStartingAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [loading, setLoading] = useState(false);
  const NEW_PRODUCT_LABEL = '+ New Inventory Item';

  // TODO: Add form input validation and error messaging
  const handleSubmit = async (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();
    setLoading(true);
    let productId = selectedProductId; // needed because setSelectedProductId is not immediate

    if (selectedProductId === NEW_PRODUCT_LABEL) {
      // Create the new product in Airtable and add to Redux
      const product = JSON.parse(JSON.stringify(EMPTY_PRODUCT));
      product.unit = unit;
      product.name = newProductName;
      delete product.id; // delete id field to add to Airtable
      productId = await createProduct(product);
    }

    // Make a deep copy of an empty inventory record
    let inventory = JSON.parse(JSON.stringify(EMPTY_INVENTORY));
    inventory.productId = productId;
    inventory.siteId = getCurrentSiteId();
    inventory.currentQuantity = parseFloat(startingAmount) || 0;
    inventory.periodStartQuantity = parseFloat(startingAmount) || 0;

    // createInventory returns the inventory item with an id
    inventory = await createInventory(inventory);

    // Once the inventory record is created, trigger an inventory update.
    await createInventoryUpdateAndUpdateInventory(userId, inventory, inventory.currentQuantity);

    // Navigate to new inventory item's profile page
    setCurrentInventoryIdInRedux(inventory.id);
    history.replace(`item`);
  };

  const handleSelectItem = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedProductId(value || '');
  };

  const handleStartingAmountInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStartingAmount((event.target.value as string) || '');
  };

  const handleNewProductName = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewProductName((event.target.value as string) || '');
  };

  const handleUnitInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUnit((event.target.value as string) || '');
  };

  const filter = createFilterOptions<string>();

  return (
    <BaseScreen title="New Inventory" leftIcon="backNav">
      <form>
        <Autocomplete
          aria-required
          value={selectedProductId}
          style={{ marginBottom: 8 }}
          onChange={handleSelectItem}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            filtered.push(NEW_PRODUCT_LABEL);
            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          id="select-item"
          options={productOptionIds}
          getOptionLabel={(option) =>
            products[option] ? `${products[option]?.name} (${products[option]?.unit})` : option
          }
          renderInput={(params) => <MaterialTextField {...params} label="Item" variant="outlined" />}
        />
        {/* If the user selected the New Inventory Item option, display extra fields */}
        {selectedProductId === NEW_PRODUCT_LABEL && (
          <div className={classes.newProductContainer}>
            <div style={{ marginRight: 8, flex: 2 }}>
              <TextField
                required
                label={'New Item Name'}
                id={'new-item-name'}
                value={newProductName}
                onChange={handleNewProductName}
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField required label={'Unit'} id={'unit'} value={unit} onChange={handleUnitInput} />
            </div>
          </div>
        )}
        <TextField
          required
          placeholder="e.g. 5"
          unit={unit}
          type="number"
          label={'Starting Amount'}
          id={'starting-amount'}
          value={startingAmount}
          onChange={handleStartingAmountInput}
        />
        <Button fullWidth loading={loading} label={'Add'} onClick={handleSubmit} />
      </form>
    </BaseScreen>
  );
}

export default withStyles(styles)(AddInventory);
