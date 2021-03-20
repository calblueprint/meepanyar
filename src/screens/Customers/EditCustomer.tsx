import { createStyles, FormControl, InputLabel, Theme, MenuItem, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import { editCustomer } from '../../lib/airtable/request';
import { editCustomerInRedux } from '../../lib/redux/siteData';
import { RootState } from '../../lib/redux/store';
import { CustomerRecord, SiteRecord, CustomerUpdateRecord } from '../../lib/airtable/interface';
import { formatUTCDateStringToLocal } from '../../lib/moment/momentUtils';
import { EMPTY_CUSTOMER } from '../../lib/utils/customerUtils';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { User, EMPTY_USER } from '../../lib/redux/userDataSlice';

const styles = (theme: Theme) =>
  createStyles({
    header: {
      marginTop: '20px',
      color: theme.palette.text.primary,
    },
    content: {
      color: theme.palette.text.primary,
    },
    formControl: {
      width: '100%',
    },
  });

interface EditCustomerProps extends RouteComponentProps {
  classes: { header: string; content: string; formControl: string; };
  location: any;
  currentCustomer: CustomerRecord;
  currentSite: SiteRecord;
  user: User;
}

function EditCustomer(props: EditCustomerProps) {
  const { classes, currentCustomer, currentSite, user } = props;
  const history = useHistory();

  const [selectedTariffPlanId, setSelectedTariffPlanId] = useState(currentCustomer.tariffPlanId);
  const [customerName, setCustomerName] = useState(currentCustomer.name);
  const [reason, setReason] = useState("");
  const [hasMeter, setHasMeter] = useState(currentCustomer.hasmeter);
  const [customerInactive, setCustomerInactive] = useState(currentCustomer.isactive);

  const handleSelectTariffPlan = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTariffPlanId(event.target.value as string);
  }

  // TODO: Add form input validation and error messaging
  const handleSubmit = (event: React.MouseEvent) => {
    // Prevent page refresh on submit
    event.preventDefault();

    // Add other info necessary to create the Airtable record
    let customerUpdate: CustomerUpdateRecord = {
      id: '',
      dateUpdated: formatUTCDateStringToLocal((new Date()).toString()),
      customerIds: [currentCustomer.id],
      explanation: reason,
      userId: user.id,
    };

    // Make a deep copy of an empty customer record
    const customer: CustomerRecord = JSON.parse(JSON.stringify(currentCustomer));
    customer.name = customerName;
    customer.hasmeter = hasMeter;
    customer.isactive = !customerInactive;
    customer.tariffPlanId = selectedTariffPlanId;

    if (customer.customerUpdates === undefined) {
      customer.customerUpdates = [customerUpdate];
    } else {
      customer.customerUpdates.push(customerUpdate);
    }

    // TODO: add error handling
    editCustomerInRedux(customer);
    editCustomer({
      ...customer,
      customerUpdate: customerUpdate
    });

    // Navigate to the new customer's profile page
    history.replace(`/customers/customer`, { customer });
  }

  const handleNameInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCustomerName(event.target.value as string);
  }

  const handleReasonInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setReason(event.target.value as string);
  }

  const tariffPlans = currentSite.tariffPlans;

  return (
    <BaseScreen title="Edit Customer" leftIcon="backNav">
      <form noValidate className={classes.content}>
        <TextField label={'Name'} id={'name'} value={customerName} onChange={handleNameInput} />
        <Checkbox label={'Select if customer is inactive'} checked={customerInactive} checkboxOnChange = {() => setCustomerInactive(!customerInactive)} />
        <Checkbox label={'Select if customer has meter'} checked={hasMeter} checkboxOnChange={() => setHasMeter(!hasMeter)} />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-tariff-plan-label">Select Tariff Plan</InputLabel>
          <Select label={"Select Tariff Plan"} id={'select-tariff-plan'} labelId = "select-tariff-plan-label" value={selectedTariffPlanId} onChange={handleSelectTariffPlan}>
            {tariffPlans.map((plan) =>
                <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <TextField label={'Reason'} id={'reason'} onChange={handleReasonInput}/>
        <Button label={'SAVE'} onClick={handleSubmit} />
      </form>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentCustomer: state.siteData.currentCustomer || EMPTY_CUSTOMER,
  currentSite: state.siteData.currentSite || EMPTY_SITE,
  user: state.userData.user || EMPTY_USER,
});

export default connect(mapStateToProps)(withStyles(styles)(EditCustomer));
