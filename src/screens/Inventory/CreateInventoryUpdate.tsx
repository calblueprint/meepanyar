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
    content: {
      color: theme.palette.text.primary,
      display: 'flex',
      flexDirection: 'column',
    },
  });

interface CreateInventoryUpdateProps extends RouteComponentProps {
  classes: { content: string };
}

function CreateInventoryUpdate(props: CreateInventoryUpdateProps) {
  const { classes } = props;
  const history = useHistory();
  const userId = useSelector(selectCurrentUserId);
  const inventory = useSelector(selectCurrentInventory);
  const product = useSelector(selectCurrentInventoryProduct);

  const [loading, setLoading] = useState(false);
  const [updatedAmount, setUpdatedAmount] = useState(0.0);

  // Redirect to InventoryMain if undefined
  if (!userId || !inventory || !product) {
    return <Redirect to={'/inventory'} />;
  }

  // TODO @wangannie: add better edge case handling
  const handleUpdatedAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUpdatedAmount(parseFloat(event.target.value as string) || 0);
  };

  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();
    setLoading(true);
    createInventoryUpdateAndUpdateInventory(userId, inventory, updatedAmount).then(() => history.goBack());
  };

  return (
    <BaseScreen title="Update Item" leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.content}>
          <InventoryInfo
            productId={inventory.productId}
            lastUpdated={getInventoryLastUpdated(inventory)}
            currentQuantity={inventory.currentQuantity}
          />
          {/* TODO fix requred/optional fields */}
          <TextField
            label={`Updated amount in ${product.unit}(s)`}
            id={'updated-amount'}
            onChange={handleUpdatedAmount}
          />
          <Button loading={loading} label="Update" onClick={handleSubmit} />
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CreateInventoryUpdate);
