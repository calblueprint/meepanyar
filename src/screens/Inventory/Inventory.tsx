import { Button } from '@material-ui/core';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';

interface InventoryProps extends RouteComponentProps {
  classes: { content: string, formControl: string};
}


function Inventory (props: InventoryProps) {
    return (
      <BaseScreen title="Inventory">
        <Link to={'/inventory/create'}>
          <Button>New Inventory</Button>
        </Link>
    </BaseScreen>
    );
}

export default Inventory;
