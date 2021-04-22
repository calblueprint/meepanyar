import { createStyles, TextField as MaterialTextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import * as yup from 'yup';
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
import { selectCurrentSiteId } from '../../lib/redux/siteData';
import { selectCurrentUserId } from '../../lib/redux/userData';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

const styles = () =>
  createStyles({
    newProductContainer: {
      flexDirection: 'row',
      display: 'flex',
    },
  });

const NEW_PRODUCT_LABEL = '+ New Inventory Item';

interface AddInventoryProps extends RouteComponentProps {
  classes: { newProductContainer: string };
}

function AddInventory(props: AddInventoryProps) {
  const intl = useInternationalization(); 
  const { classes } = props;
  const products = useSelector(selectAllProducts);
  const siteInventory = useSelector(selectAllCurrentSiteInventoryArray);
  const userId = useSelector(selectCurrentUserId);
  const siteId = useSelector(selectCurrentSiteId);
  const history = useHistory();

  // Product IDs for items that the site already has inventory for
  const currentSiteProductIds = siteInventory.map((inventory: InventoryRecord) => inventory.productId);
  // Filter to only show products that the site doesn't already have
  const productOptionIds = Object.entries(products)
    .filter(([id, _]) => !currentSiteProductIds.includes(id))
    .map((item) => item[0]);

  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    selectedProductId: yup.string().required(intl(words.must_select_a_product)),
    startingAmount: yup.number().min(0, intl(words.please_enter_a_valid_amount)).required(intl(words.must_enter_an_amount)),
    newProductName: yup.string().when('selectedProductId', {
      is: NEW_PRODUCT_LABEL,
      then: yup.string().required(intl(words.must_enter_new_product_name)),
    }),
    unit: yup.string().when('selectedProductId', {
      is: NEW_PRODUCT_LABEL,
      then: yup.string().required(intl(words.must_enter_unit_name)),
    }),
  });
  const formik = useFormik({
    initialValues: {
      selectedProductId: '',
      startingAmount: '',
      newProductName: '',
      unit: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    const { selectedProductId, startingAmount, newProductName, unit } = values;
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
    inventory.siteId = siteId;
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

  const filter = createFilterOptions<string>();

  return (
    <BaseScreen title={intl(words.new_inventory)} leftIcon="backNav">
      <form onSubmit={formik.handleSubmit} noValidate>
        <Autocomplete
          aria-required
          style={{ marginBottom: 8 }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            filtered.push(NEW_PRODUCT_LABEL);
            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          id="selectedProductId"
          options={productOptionIds}
          getOptionLabel={(option) =>
            products[option] ? `${products[option]?.name} (${products[option]?.unit})` : option
          }
          renderInput={(params) => (
            <MaterialTextField
              {...params}
              error={formik.touched.selectedProductId && Boolean(formik.errors.selectedProductId)}
              helperText={formik.touched.selectedProductId && formik.errors.selectedProductId}
              label={intl(words.item)}
              variant="outlined"
            />
          )}
          value={formik.values.selectedProductId}
          onChange={(_, value) => formik.setFieldValue('selectedProductId', value)}
        />
        {/* If the user selected the New Inventory Item option, display extra fields */}
        {formik.values.selectedProductId === NEW_PRODUCT_LABEL && (
          <div className={classes.newProductContainer}>
            <div style={{ marginRight: 8, flex: 2 }}>
              <TextField
                required
                label={intl(words.new_item_name)}
                id={'newProductName'}
                value={formik.values.newProductName}
                onChange={formik.handleChange}
                error={formik.touched.newProductName && Boolean(formik.errors.newProductName)}
                helperText={formik.touched.newProductName && formik.errors.newProductName}
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                required
                label={intl(words.unit)}
                id={'unit'}
                value={formik.values.unit}
                onChange={formik.handleChange}
                error={formik.touched.unit && Boolean(formik.errors.unit)}
                helperText={formik.touched.unit && formik.errors.unit}
              />
            </div>
          </div>
        )}
        <TextField
          required
          placeholder={intl(words.eg_x, "5")}
          unit={formik.values.unit}
          type="number"
          label={intl(words.starting_amount)}
          id={'startingAmount'}
          value={formik.values.startingAmount}
          onChange={formik.handleChange}
          error={formik.touched.startingAmount && Boolean(formik.errors.startingAmount)}
          helperText={formik.touched.startingAmount && formik.errors.startingAmount}
        />
        <Button fullWidth loading={loading} label={intl(words.add)} />
      </form>
    </BaseScreen>
  );
}

export default withStyles(styles)(AddInventory);
