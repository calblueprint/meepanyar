import { Button as MaterialButton, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { createPurchaseRequestAndUpdateInventory } from '../../lib/airtable/request';
import { selectCurrentInventory, selectCurrentInventoryProduct } from '../../lib/redux/inventoryData';
import { EMPTY_PURCHASE_REQUEST } from '../../lib/redux/inventoryDataSlice';
import { userIdSelector } from '../../lib/redux/userData';
import { getInventoryLastUpdated } from '../../lib/utils/inventoryUtils';
import InventoryInfo from './components/InventoryInfo';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
      display: 'flex',
      flexDirection: 'column',
    },
    cameraButton: {
      backgroundColor: '#F7F9FC',
      height: 130,
      border: `3.5px dashed ${theme.palette.divider}`,
      radius: '6px',
    },
});

interface CreatePurchaseRequestProps extends RouteComponentProps {
  classes: { content: string; cameraButton: string; };
}

function CreatePurchaseRequest(props: CreatePurchaseRequestProps) {
  const { classes } = props;
  const history = useHistory();
  const userId = useSelector(userIdSelector);
  const inventory = useSelector(selectCurrentInventory);
  const product = useSelector(selectCurrentInventoryProduct);

  const [amountPurchased, setAmountPurchased] = useState(0.0);
  const [amountSpent, setAmountSpent] = useState(0.0);
  const [notes, setNotes] = useState("");

  // Redirect to InventoryMain if undefined
  if (!userId || !inventory || !product) {
    return <Redirect to={'/inventory'} />;
  }

  // TODO @wangannie: add better edge case handling
  const handleAmountPurchasedInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmountPurchased(parseFloat(event.target.value as string) || 0);
  }

  const handleAmountSpentInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmountSpent(parseFloat(event.target.value as string) || 0);
  }

  const handleNotesInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNotes(event.target.value as string);
  }

  const handleSubmit = async (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();
    // Make a deep copy of an empty purchase request record
    const purchaseRequest = JSON.parse(JSON.stringify(EMPTY_PURCHASE_REQUEST));
    purchaseRequest.requesterId = userId;
    purchaseRequest.createdAt = moment().toISOString();
    purchaseRequest.amountPurchased = amountPurchased;
    purchaseRequest.amountSpent = amountSpent;
    purchaseRequest.notes = notes;
    purchaseRequest.inventoryId = inventory.id;
    // TODO: add image upload

    await createPurchaseRequestAndUpdateInventory(purchaseRequest);
    history.goBack();
  }

  return (
    <BaseScreen title="Inventory Purchase" leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.content}>
          <InventoryInfo 
            productId={inventory.productId} 
            lastUpdated={getInventoryLastUpdated(inventory)} 
            currentQuantity={inventory.currentQuantity}
          />
          {/* TODO fix requred/optional fields */}
          <TextField label={`Amount Purchased (${product.unit})`} id={'amount-purchased'} primary={true} onChange={handleAmountPurchasedInput} />
          <TextField label={'Amount Spent (ks)'} id={'amount-spent'} primary={true} onChange={handleAmountSpentInput} />
          <TextField label={'Notes (optional)'} id={'notes'} primary={true} onChange={handleNotesInput} />
          <Typography variant="caption" color="textSecondary">
            Receipt
          </Typography>
          <MaterialButton className={classes.cameraButton} variant="contained" color="primary" disableElevation={true}>
            <div>
              <Typography color="primary"><PhotoLibraryIcon /></Typography>
              <Typography variant="h2" color="primary">Add Photo</Typography>
            </div>
          </MaterialButton>
          <Button label = "Confirm" onClick={handleSubmit}/>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CreatePurchaseRequest);
