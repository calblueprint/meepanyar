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
import {
  getInventoryCurrentQuantity,
  selectCurrentInventory,
  selectCurrentInventoryProduct
} from '../../lib/redux/inventoryData';
import { EMPTY_PURCHASE_REQUEST } from '../../lib/redux/inventoryDataSlice';
import { selectCurrentUserId } from '../../lib/redux/userData';
import { getInventoryLastUpdated } from '../../lib/utils/inventoryUtils';
import InventoryInfo from './components/InventoryInfo';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

const styles = (theme: Theme) =>
  createStyles({
    headerContainer: {
      marginBottom: theme.spacing(2),
    },
  });

interface CreatePurchaseRequestProps extends RouteComponentProps {
  classes: { headerContainer: string };
  location: any;
}

function CreatePurchaseRequest(props: CreatePurchaseRequestProps) {
  const intl = useInternationalization(); 
  const { classes } = props;
  const history = useHistory();
  const userId = useSelector(selectCurrentUserId);
  const inventory = useSelector(selectCurrentInventory);
  const product = useSelector(selectCurrentInventoryProduct);

  const [amountPurchased, setAmountPurchased] = useState(props.location.state?.amountPurchased || '');
  const [amountSpent, setAmountSpent] = useState(props.location.state?.amountSpent || '');
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
    setAmountPurchased((event.target.value as string) || '');
  };

  const handleAmountSpentInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmountSpent((event.target.value as string) || '');
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
    purchaseRequest.amountPurchased = parseFloat(amountPurchased) || 0;
    purchaseRequest.amountSpent = parseFloat(amountSpent) || 0;
    purchaseRequest.notes = notes;
    purchaseRequest.inventoryId = inventory.id;
    purchaseRequest.updatedQuantity =
      getInventoryCurrentQuantity(purchaseRequest.inventoryId) + purchaseRequest.amountPurchased;
    if (photoUri) {
      purchaseRequest.receipt = [{ url: photoUri }];
    }

    createPurchaseRequestAndUpdateInventory(purchaseRequest).then(() => history.go(goBack));
  };

  return (
    <BaseScreen title={intl(words.inventory_purchase)} leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.headerContainer}>
          <InventoryInfo
            productId={inventory.productId}
            lastUpdated={getInventoryLastUpdated(inventory.id)}
            currentQuantity={inventory.currentQuantity}
          />
        </div>
        <form>
          <TextField
            required
            type="number"
            value={amountPurchased}
            label={intl(words.amount_purchased)}
            id={'amount-purchased'}
            placeholder={intl(words.eg_x, "5")}
            unit={product.unit}
            onChange={handleAmountPurchasedInput}
          />
          <TextField
            required
            type="number"
            currency
            value={amountSpent}
            label={intl(words.amount_spent_paid)}
            id={'amount-spent'}
            placeholder={intl(words.eg_x, "5")}
            onChange={handleAmountSpentInput}
          />
          <TextField
            placeholder={intl(words.enter_notes)}
            value={notes}
            label={intl(words.notes)}
            id={'notes'}
            onChange={handleNotesInput}
          />
          <CameraButton
            preservedState={{ amountPurchased, amountSpent, notes }}
            goBack={goBack + 1}
            id="upload-receipt"
            label={intl(words.receipt)}
            photoUri={photoUri}
          />
          <Button fullWidth loading={submitIsLoading} label={intl(words.submit)} onClick={handleSubmit} />
        </form>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CreatePurchaseRequest);
