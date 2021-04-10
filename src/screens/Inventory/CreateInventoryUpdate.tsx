import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
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
  const [updatedAmount, setUpdatedAmount] = useState('');

  // Redirect to InventoryMain if undefined
  if (!userId || !inventory || !product) {
    return <Redirect to={'/inventory'} />;
  }

  // TODO @wangannie: add better edge case handling
  const handleUpdatedAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUpdatedAmount(event.target.value as string || '');
  };

  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();
    setLoading(true);
    createInventoryUpdateAndUpdateInventory(userId, inventory, parseFloat(updatedAmount) || 0).then(() => history.goBack());
  };

  return (
    <BaseScreen title="Update Item" leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.headerContainer}>
          <InventoryInfo
            outlined
            productId={inventory.productId}
            lastUpdated={getInventoryLastUpdated(inventory.id)}
            currentQuantity={inventory.currentQuantity}
          />
        </div>
        <form>
          <TextField
            placeholder={'e.g. 5'}
            required
            type="number"
            unit={product.unit}
            label={`Updated Amount`}
            id={'updated-amount'}
            value={updatedAmount}
            onChange={handleUpdatedAmount}
          />
          <Button fullWidth loading={loading} label="Update" onClick={handleSubmit} />
        </form>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CreateInventoryUpdate);
