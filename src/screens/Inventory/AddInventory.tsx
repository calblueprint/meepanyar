import { createStyles, FormControl, TextField as MaterialTextField, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { InventoryRecord } from '../../lib/airtable/interface';
import { createInventory, createProduct } from '../../lib/airtable/request';
import { addProductToRedux, setCurrentInventoryIdInRedux } from '../../lib/redux/inventoryData';
import {
  EMPTY_INVENTORY,
  EMPTY_PRODUCT,
  selectAllCurrentSiteInventoryArray,
  selectAllProducts
} from '../../lib/redux/inventoryDataSlice';
import { getCurrentSiteId } from '../../lib/redux/siteData';
import { generateOfflineId } from '../../lib/utils/offlineUtils';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    formControl: {
      width: '100%',
    },
    newProductContainer: {
      flexDirection: 'row',
      display: 'flex',
      marginBottom: 40,
    },
  });

interface AddInventoryProps extends RouteComponentProps {
  classes: { content: string; formControl: string; newProductContainer: string };
}

function AddInventory(props: AddInventoryProps) {
  const { classes } = props;
  const products = useSelector(selectAllProducts);
  const siteInventory = useSelector(selectAllCurrentSiteInventoryArray);
  const history = useHistory();

  // Product IDs for items that the site already has inventory for
  const currentSiteProductIds = siteInventory.map((inventory: InventoryRecord) => inventory.productId);
  // Filter to only show products that the site doesn't already have
  const productOptionIds = Object.entries(products)
    .filter(([id, _]) => !currentSiteProductIds.includes(id))
    .map((item) => item[0]);

  const [selectedProductId, setSelectedProductId] = useState('');
  const [startingAmount, setStartingAmount] = useState(0);
  const [unit, setUnit] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const NEW_PRODUCT_LABEL = '+ New Inventory Item';

  // TODO: Add form input validation and error messaging
  const handleSubmit = async (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();
    let productId = selectedProductId; // needed because setSelectedProductId is not immediate

    if (selectedProductId === NEW_PRODUCT_LABEL) {
      // Create the new product in Airtable and add to Redux
      const product = JSON.parse(JSON.stringify(EMPTY_PRODUCT));
      product.unit = unit;
      product.name = newProductName;
      delete product.id; // delete id field to add to Airtable
      try {
        productId = await createProduct(product);
      } catch (error) {
        console.log('[AddInventory] (createProduct, handleSubmit) Error: ', error);
        productId = generateOfflineId();
      }
      product.id = productId;
      addProductToRedux(product);
    }

    // Make a deep copy of an empty inventory record
    let inventory = JSON.parse(JSON.stringify(EMPTY_INVENTORY));
    inventory.productId = productId;
    inventory.siteId = getCurrentSiteId();
    inventory.currentQuantity = startingAmount;
    inventory.periodStartQuantity = startingAmount;

    // createInventory returns the inventory item with an id
    inventory = await createInventory(inventory);

    // TODO: @wangannie create inventory update

    // Navigate to new inventory item's profile page
    setCurrentInventoryIdInRedux(inventory.id);
    history.replace(`item`);
  };
  
  const handleSelectItem = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedProductId(value || '');
  };

  const handleStartingAmountInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStartingAmount(parseFloat(event.target.value as string) || 0);
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
      <form noValidate className={classes.content} onSubmit={() => false}>
        <FormControl variant="outlined" className={classes.formControl}>
          <Autocomplete
            value={selectedProductId}
            style={{ marginBottom: 20 }}
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
        </FormControl>
        {/* If the user selected the New Inventory Item option, display extra fields */}
        {selectedProductId === NEW_PRODUCT_LABEL && (
          <div className={classes.newProductContainer}>
            <div style={{ marginRight: 10, flex: 2 }}>
              <TextField label={'New Item'} id={'new-item'} primary={true} onChange={handleNewProductName} />
            </div>
            <div style={{ flex: 1 }}>
              <TextField label={'Unit'} id={'unit'} primary={true} onChange={handleUnitInput} />
            </div>
          </div>
        )}
        <TextField
          label={'Starting Amount'}
          id={'starting-amount'}
          primary={true}
          onChange={handleStartingAmountInput}
        />
        <Button label={'Add'} onClick={handleSubmit} />
      </form>
    </BaseScreen>
  );
}

export default withStyles(styles)(AddInventory);
