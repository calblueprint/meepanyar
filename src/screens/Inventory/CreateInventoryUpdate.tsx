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
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

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
  const intl = useInternationalization(); 
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
    <BaseScreen title={intl(words.updated_x, words.item)} leftIcon="backNav">
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
            placeholder={intl(words.eg_x, "5")}
            required
            type="number"
            unit={product.unit}
            label={intl(words.last_updated_amount)}
            id={'updated-amount'}
            value={updatedAmount}
            onChange={handleUpdatedAmount}
          />
          <Button fullWidth loading={loading} label={intl(words.update)} onClick={handleSubmit} />
        </form>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CreateInventoryUpdate);
