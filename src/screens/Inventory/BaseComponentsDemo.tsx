import { createStyles, FormControl, TextField as MaterialTextField, Theme, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import CameraButton from '../../components/CameraButton';
import SearchBar from '../../components/SearchBar';
import TextField from '../../components/TextField';
import { InventoryRecord } from '../../lib/airtable/interface';
import {
  selectAllCurrentSiteInventoryArray,
  selectAllProducts
} from '../../lib/redux/inventoryDataSlice';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    formControl: {
      width: '100%',
    },
    twoColumnContainer: {
      flexDirection: 'row',
      display: 'flex',
      marginBottom: 40,
    },
  });

interface BaseComponentsProps extends RouteComponentProps {
  classes: { content: string; formControl: string; twoColumnContainer: string };
}

function BaseComponentsDemo(props: BaseComponentsProps) {
  const { classes } = props;
  const products = useSelector(selectAllProducts);
  const siteInventory = useSelector(selectAllCurrentSiteInventoryArray);
  const [loading, setLoading] = useState(false);

  // Product IDs for items that the site already has inventory for
  const currentSiteProductIds = siteInventory.map((inventory: InventoryRecord) => inventory.productId);
  // Filter to only show products that the site doesn't already have
  const productOptionIds = Object.entries(products)
    .filter(([id, _]) => !currentSiteProductIds.includes(id))
    .map((item) => item[0]);

  const [selectedProductId, setSelectedProductId] = useState('');

  const handleSelectItem = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedProductId(value || '');
  };

  return (
    <BaseScreen title="Base Components" leftIcon="backNav">
      <BaseScrollView>
        <CameraButton id="take-picture" goBack={-1} label="Camera button label" />
        <CameraButton id="picture-taken" photoUri="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/170px-ReceiptSwiss.jpg" goBack={-1} label="Camera button with image" />
        
        <SearchBar onSearchChange={() => null} placeholder="Search for..." />
        <Button label={'Default'} />
        <Button label={'Default with startIcon'} startIcon={<DeleteIcon/>}/>
        <Button label={'Default Full Width'} fullWidth />
        <Button label={'Outlined'} variant="outlined" />
        <Button loading={loading} onClick={() => setLoading(!loading)} label={'Click to initiate loading'}/>
        <Button label={'Disabled'} disabled />
        <Button label={'Text Button'} variant="text" />
        <Button label={'Text Button Disabled'} variant="text" disabled/>

        <form noValidate className={classes.content} onSubmit={() => false}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Autocomplete
              value={selectedProductId}
              style={{ marginBottom: 20 }}
              onChange={handleSelectItem}
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
          <div className={classes.twoColumnContainer}>
            <div style={{ marginRight: 10, flex: 2 }}>
              <TextField label={'New Item'} id={'new-item'} />
            </div>
            <div style={{ flex: 1 }}>
              <TextField label={'Unit'} id={'unit'} />
            </div>
          </div>
          <TextField
            disabled
            label={'Disabled'}
            id={'disabled'}
            placeholder={"Disabled placeholder"}
          />
          <TextField
            label={'Resting Required with Helper Text'}
            id={'resting-required'}
            helperText={"Helper text"}
          />
          <TextField
            label={'Resting'}
            id={'resting'}
            placeholder={"Resting Placeholder"}
          />

          <TextField
            label={'Error'}
            id={'error'}
            error
            placeholder={"Error Placeholder"}
            helperText={"Error message"}
          />

          <TextField
            label='Numbers only'
            id='numbers-only'
            type='number'
            placeholder="Placeholder"
            helperText="Only numbers!"
          />
          
          <TextField
            label={'With Unit'}
            id={'with-unit'}
            placeholder={"33.33"}
            unit={'bottle'}
          />
          
        </form>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(BaseComponentsDemo);
