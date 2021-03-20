import { createStyles, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { ProductRecord, SiteRecord } from '../../lib/airtable/interface';
import { createInventory } from '../../lib/airtable/request';
import { addInventoryToRedux } from '../../lib/redux/inventoryData';
import { EMPTY_INVENTORY } from '../../lib/redux/inventoryDataSlice';
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
  products: ProductRecord[];
  userId: string;
}


function AddInventory(props: AddInventoryProps) {
  const { classes, currentSite, products, userId} = props;
  const history = useHistory();

  const [selectedProductId, setSelectedProductId] = useState("");
  const [startingAmount, setStartingAmount] = useState(0);

  // TODO: Add form input validation and error messaging
  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();

    // Make a deep copy of an empty inventory record
    const inventory = JSON.parse(JSON.stringify(EMPTY_INVENTORY));
    inventory.productId = selectedProductId;
    inventory.siteId = currentSite.id;
    inventory.currentQuantity = startingAmount;
    inventory.periodStartQuantity = startingAmount;
    addInventoryToRedux(inventory);

    createInventory(inventory);

    // TODO create inventory update
    // TOOD: navigate to new inventory profile page
    history.goBack();
  }

  const handleSelectItem = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProductId(event.target.value as string);
  }
  
  const handleStartingAmountInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStartingAmount(parseFloat(event.target.value as string));
  }

  return (
    <BaseScreen title="New Inventory" leftIcon="backNav">
      <form noValidate className={classes.content} onSubmit={() => false}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-item-label">Item</InputLabel>
          <Select label={"Select Item"} id={'select-item'} labelId = "select-item-label" onChange={handleSelectItem}>
            {products.map((plan) =>
                // TOOD @wangannie filter out products that the site already has
                <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
            )}
          </Select>
        </FormControl>
          <TextField label={'Starting Amount'} id={'starting-amount'} primary={true} onChange={handleStartingAmountInput} />
        <Button label={'Add'} onClick={handleSubmit} />
      </form>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite || EMPTY_SITE,
  products: state.inventoryData.products || [],
  userId: state.userData.user?.id || '',
});

export default connect(mapStateToProps)(withStyles(styles)(AddInventory));
