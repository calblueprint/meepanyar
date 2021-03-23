import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { ProductRecord, PurchaseRequestRecord } from '../../lib/airtable/interface';
import { getProductByInventoryId } from '../../lib/redux/inventoryData';
import { RootState } from '../../lib/redux/store';


const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    section: {
      marginTop: '30px',
    },
  });

interface PurchaseRequestsProps extends RouteComponentProps {
  classes: { content: string; section: string; };
  location: any;
  product: ProductRecord;
}

const getActionButtons = () => {
  return (
    <div>
        <Button label={"Approve"}/>
        <Button label={"Deny"}/>
    </div>
  );
};

function PurchaseRequest (props: PurchaseRequestsProps) {
  const { classes, product } = props;
  const purchaseRequest: PurchaseRequestRecord = props.location.state.purchaseRequest;

  return (
    <BaseScreen leftIcon="backNav">
      <BaseScrollView>
        <div className={classes.content}>
          <Typography variant="h3">{`Purchase Request for ${product.name}`}</Typography>
          <Typography variant="body1">{`Amount purchased ${purchaseRequest.amountPurchased} ${product.unit}(s)`}</Typography>
          <Typography variant="body1">{`Amount spent ${purchaseRequest.amountSpent} ks`}</Typography>
          <Typography variant="body1">{`Created at ${purchaseRequest.createdAt}`}</Typography>
          <Typography variant="body1">{`Submitted by ${purchaseRequest.requesterId}`}</Typography>
          {/* TODO: lookup user by id */}
          {/* TODO: Add image */}
          {getActionButtons()}
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState, ownProps: { location: { state: { purchaseRequest: { inventoryId: string; }; }; }; }) => ({
    product: getProductByInventoryId(ownProps.location.state.purchaseRequest.inventoryId),
});

export default connect(mapStateToProps)(withStyles(styles)(PurchaseRequest));
