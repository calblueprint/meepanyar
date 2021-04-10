import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import CameraButton from '../../components/CameraButton';
import TextField from '../../components/TextField';
import { createPurchaseRequestAndUpdateInventory } from '../../lib/airtable/request';
import { selectCurrentInventory, selectCurrentInventoryProduct } from '../../lib/redux/inventoryData';
import { EMPTY_PURCHASE_REQUEST } from '../../lib/redux/inventoryDataSlice';
import { selectCurrentUserId } from '../../lib/redux/userData';
import { getInventoryLastUpdated } from '../../lib/utils/inventoryUtils';
import InventoryInfo from './components/InventoryInfo';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
      display: 'flex',
      flexDirection: 'column',
    },
  });

interface CreatePurchaseRequestProps extends RouteComponentProps {
  classes: { content: string; };
  location: any;
}

function CreatePurchaseRequest(props: CreatePurchaseRequestProps) {
  const { classes } = props;
  const history = useHistory();
  const userId = useSelector(selectCurrentUserId);
  const inventory = useSelector(selectCurrentInventory);
  const product = useSelector(selectCurrentInventoryProduct);

  const [amountPurchased, setAmountPurchased] = useState(props.location.state?.amountPurchased || 0.0);
  const [amountSpent, setAmountSpent] = useState(props.location.state?.amountSpent || 0.0);
  const [notes, setNotes] = useState(props.location.state?.notes || '');
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const goBack = props.location.state?.goBack || -1;

  const photoUri = props.location.state?.photo;

  // Redirect to InventoryMain if undefined
  if (!userId || !inventory || !product) {
    return <Redirect to={'/inventory'} />;
  }

  // TODO @wangannie: add better edge case handling
  const handleAmountPurchasedInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmountPurchased(parseFloat(event.target.value as string) || 0);
  };

  const handleAmountSpentInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmountSpent(parseFloat(event.target.value as string) || 0);
  };

  const handleNotesInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNotes(event.target.value as string);
  };

  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();
    setSubmitIsLoading(true);
    // Make a deep copy of an empty purchase request record
    const purchaseRequest = JSON.parse(JSON.stringify(EMPTY_PURCHASE_REQUEST));
    purchaseRequest.requesterId = userId;
    purchaseRequest.createdAt = moment().toISOString();
    purchaseRequest.amountPurchased = amountPurchased;
    purchaseRequest.amountSpent = amountSpent;
    purchaseRequest.notes = notes;
    purchaseRequest.inventoryId = inventory.id;
    if (photoUri) {
      purchaseRequest.receipt = [{ url: photoUri }];
    }

    createPurchaseRequestAndUpdateInventory(purchaseRequest).then(() => history.go(goBack));
  }

  return (
    <BaseScreen title="Inventory Purchase" leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.content}>
          <InventoryInfo
            productId={inventory.productId}
            lastUpdated={getInventoryLastUpdated(inventory.id)}
            currentQuantity={inventory.currentQuantity}
          />
          {/* TODO fix requred/optional fields */}
          <TextField
            value={amountPurchased}
            label={`Amount Purchased (${product.unit})`}
            id={'amount-purchased'}
            onChange={handleAmountPurchasedInput}
          />
          <TextField
            value={amountSpent}
            label={'Amount Spent (ks)'}
            id={'amount-spent'}
            onChange={handleAmountSpentInput}
          />
          <TextField value={notes} label={'Notes (optional)'} id={'notes'} onChange={handleNotesInput} />
          <CameraButton
            preservedState={{ amountPurchased, amountSpent, notes }}
            goBack={goBack + 1}
            id="upload-receipt"
            label="Receipt"
            photoUri={photoUri}
          />
          <Button loading={submitIsLoading} label="Submit" onClick={handleSubmit} />
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CreatePurchaseRequest);
