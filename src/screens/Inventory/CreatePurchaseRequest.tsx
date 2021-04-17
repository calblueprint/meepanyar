import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import * as yup from 'yup';
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

const styles = (theme: Theme) =>
  createStyles({
    headerContainer: {
      marginBottom: theme.spacing(2),
    },
  });

const validationSchema = yup.object({
  amountPurchased: yup.number().positive('Please enter a positive number').required('Please enter an amount'),
  amountSpent: yup.number().positive('Please enter a positive number').required('Please enter an amount'),
  notes: yup.string(),
  receipt: yup.string(),
});

interface CreatePurchaseRequestProps extends RouteComponentProps {
  classes: { headerContainer: string };
  location: any;
}

function CreatePurchaseRequest(props: CreatePurchaseRequestProps) {
  const { classes } = props;
  const history = useHistory();
  const userId = useSelector(selectCurrentUserId);
  const inventory = useSelector(selectCurrentInventory);
  const product = useSelector(selectCurrentInventoryProduct);

  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const goBack = props.location.state?.goBack || -1;

  const photoUri = props.location.state?.photo;

  const formik = useFormik({
    initialValues: {
      amountPurchased: (props.location.state?.amountPurchased as string) || '',
      amountSpent: (props.location.state?.amountSpent as string) || '',
      notes: (props.location.state?.notes as string) || '',
      receipt: (props.location.state?.photo as string) || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // Redirect to InventoryMain if undefined
  if (!userId || !inventory || !product) {
    return <Redirect to={'/inventory'} />;
  }

  const handleSubmit = (values: any) => {
    const { amountPurchased, amountSpent, notes } = values;
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
    <BaseScreen title="Inventory Purchase" leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.headerContainer}>
          <InventoryInfo
            productId={inventory.productId}
            lastUpdated={getInventoryLastUpdated(inventory.id)}
            currentQuantity={inventory.currentQuantity}
          />
        </div>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            required
            type="number"
            label={`Amount Purchased`}
            id={'amountPurchased'}
            placeholder="e.g. 5"
            unit={product.unit}
            value={formik.values.amountPurchased}
            onChange={formik.handleChange}
            error={formik.touched.amountPurchased && Boolean(formik.errors.amountPurchased)}
            helperText={formik.touched.amountPurchased && formik.errors.amountPurchased}
          />
          <TextField
            required
            type="number"
            currency
            label={'Amount Spent'}
            id={'amountSpent'}
            placeholder="e.g. 5"
            value={formik.values.amountSpent}
            onChange={formik.handleChange}
            error={formik.touched.amountSpent && Boolean(formik.errors.amountSpent)}
            helperText={formik.touched.amountSpent && formik.errors.amountSpent}
          />
          <TextField
            placeholder="Enter Notes..."
            label={'Notes'}
            id={'notes'}
            value={formik.values.notes}
            onChange={formik.handleChange}
            error={formik.touched.notes && Boolean(formik.errors.notes)}
            helperText={formik.touched.notes && formik.errors.notes}
          />
          <CameraButton
            preservedState={formik.values}
            goBack={goBack + 1}
            id="receipt"
            label="Receipt"
            photoUri={photoUri}
            error={formik.touched.receipt && Boolean(formik.errors.receipt)}
            helperText={formik.touched.receipt && formik.errors.receipt}
          />
          <Button fullWidth loading={submitIsLoading} label="Submit" />
        </form>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CreatePurchaseRequest);
