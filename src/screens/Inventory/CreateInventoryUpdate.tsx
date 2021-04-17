import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { createInventoryUpdateAndUpdateInventory } from '../../lib/airtable/request';
import { selectCurrentInventory, selectCurrentInventoryProduct } from '../../lib/redux/inventoryData';
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
  updatedAmount: yup.number().positive('Please enter a positive number').required('Please enter an amount'),
});

interface CreateInventoryUpdateProps extends RouteComponentProps {
  classes: { headerContainer: string };
}

function CreateInventoryUpdate(props: CreateInventoryUpdateProps) {
  const { classes } = props;
  const history = useHistory();
  const userId = useSelector(selectCurrentUserId);
  const inventory = useSelector(selectCurrentInventory);
  const product = useSelector(selectCurrentInventoryProduct);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      updatedAmount: '',
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
    const { updatedAmount } = values;
    setLoading(true);
    createInventoryUpdateAndUpdateInventory(userId, inventory, parseFloat(updatedAmount) || 0).then(() =>
      history.goBack(),
    );
  };

  return (
    <BaseScreen title="Update Item" leftIcon="backNav">
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
            placeholder={'e.g. 5'}
            required
            type="number"
            unit={product.unit}
            label={`Updated Amount`}
            id={'updatedAmount'}
            value={formik.values.updatedAmount}
            onChange={formik.handleChange}
            error={formik.touched.updatedAmount && Boolean(formik.errors.updatedAmount)}
            helperText={formik.touched.updatedAmount && formik.errors.updatedAmount}
          />
          <Button fullWidth loading={loading} label="Update" />
        </form>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CreateInventoryUpdate);
