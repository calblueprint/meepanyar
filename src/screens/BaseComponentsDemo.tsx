import {
  createStyles,
  FormControl,
  TextField as MaterialTextField,
  Theme,
  Typography,
  withStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../components/BaseComponents/BaseScreen';
import BaseScrollView from '../components/BaseComponents/BaseScrollView';
import Button from '../components/Button';
import CameraButton from '../components/CameraButton';
import SearchBar from '../components/SearchBar';
import TextField from '../components/TextField';
import { InventoryRecord } from '../lib/airtable/interface';
import { selectAllCurrentSiteInventoryArray, selectAllProducts } from '../lib/redux/inventoryDataSlice';

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
    },
    label: {
      marginTop: 40,
      marginBottom: 8,
    },
  });

interface BaseComponentsProps extends RouteComponentProps {
  classes: { content: string; formControl: string; twoColumnContainer: string; label: string };
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
        <Typography variant="h3">Buttons</Typography>
        <Button label={'Default'} />
        <Button label={'Default Full Width'} fullWidth />
        <Button label={'Default with startIcon'} startIcon={<DeleteIcon />} />
        <Button label={'Outlined'} variant="outlined" />
        <Button loading={loading} onClick={() => setLoading(!loading)} label={'Click to initiate loading'} />
        <Button label={'Disabled'} disabled />
        <Button label={'Text Button'} variant="text" />
        <Button label={'Text Button Disabled'} variant="text" disabled />

        <Typography className={classes.label} variant="h3">Camera Button</Typography>
        <CameraButton id="take-picture" goBack={-1} label="Camera button label" />
        <CameraButton
          id="take-picture-error"
          goBack={-1}
          label="Camera button with error"
          error
          helperText="Could not add photo. Please try again."
        />
        <CameraButton
          id="picture-taken"
          photoUri="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/170px-ReceiptSwiss.jpg"
          goBack={-1}
          label="Camera button with image"
        />

        <Typography className={classes.label} variant="h3">Text Fields</Typography>
        <TextField label={'Resting'} id={'resting'} placeholder={'Resting Placeholder'} />
        <TextField disabled label={'Disabled'} id={'disabled'} placeholder='Disabled placeholder -- cant click me!' />
        <TextField label={'Resting Required with Helper Text'} required id={'resting-required'} helperText={'Helper text'} />
        <TextField label={'Error'} id={'error'} error placeholder={'Error Placeholder'} helperText={'Error message'} />
        <TextField
          label="Numbers only"
          id="numbers-only"
          type="number"
          placeholder="Placeholder"
          helperText="You can only type numbers here!"
        />
        <div className={classes.twoColumnContainer}>
          <div style={{ marginRight: 10, flex: 2 }}>
            <TextField label={'First column'} id={'first-column'} />
          </div>
          <div style={{ flex: 1 }}>
            <TextField label={'Second'} id={'second-column'} />
          </div>
        </div>
        <TextField label={'With Unit'} id={'with-unit'} placeholder={'33.33'} unit={'bottle'} />

        <Typography className={classes.label} variant="h3">Search Bar</Typography>
        <SearchBar onSearchChange={() => null} placeholder="Search for..." />

        <Typography className={classes.label} variant="h3">Autocomplete/Select</Typography>
        <Typography style={{marginBottom: 20}} variant="body1">
          {`Note: this is not a customized base component but it's left here as an example for how to use the MaterialUI Autocomplete.`}
        </Typography>
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
        </form>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(BaseComponentsDemo);
