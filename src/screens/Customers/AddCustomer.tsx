import { createStyles, FormControl, FormHelperText, MenuItem, Select, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import { SiteRecord } from '../../lib/airtable/interface';
import { RootState } from '../../lib/redux/store';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
  });

interface AddCustomerProps extends RouteComponentProps {
  classes: { content: string };
  location: any;
  currentSite: SiteRecord;
}


function AddCustomer(props: AddCustomerProps) {
  const { classes, currentSite } = props;

  const [selectedTariffPlan, setSelectedTariffPlan] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [meter, setMeter] = useState("");
  const [meterChecked, setMeterChecked] = useState(false);
  const [customerInactive, setCustomerInactive] = useState(false);

  const handleSelectTariffPlan = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log("handling select!");
    setSelectedTariffPlan(event.target.value as string);
  }

  const handleSubmit = () => {
    console.log("NEW CUSTOMER SUBMITTED:", customerName, " Meter: ", meter, " | Inactive:", customerInactive, " | Tariff plan", selectedTariffPlan);
  }

  const handleNameInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCustomerName(event.target.value as string);
  }

  const handleMeterInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMeter(event.target.value as string);
  }

  const tariffPlans = currentSite.tariffPlans;

  return (
    <BaseScreen title="Add New Customer" leftIcon="backNav">
      <form noValidate className={classes.content} onSubmit={() => false}>
        <TextField label={'Name'} id={'name'} primary={true} onChange={handleNameInput} />
        <FormControl>
            <Select inputProps={{ 'aria-label': 'Tariff Plan' }} onChange={handleSelectTariffPlan}>
              {tariffPlans.map((plan, index) =>
                <MenuItem key={index} value={plan.id}>{plan.name}</MenuItem>
                )}
            </Select>
            <FormHelperText>Tariff Plan {tariffPlans.length}</FormHelperText>
        </FormControl>
        <Checkbox label={'Meter:'} textField={meterChecked ? 'meter': null} checkboxOnChange={() => setMeterChecked(!meterChecked)}textFieldOnChange={handleMeterInput}/>
        <Checkbox label={'Customer is inactive'} checkboxOnChange = {() => setCustomerInactive(!customerInactive)}/>
        <Button label={'Add'} onClick={handleSubmit} />
      </form>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite
});

export default connect(mapStateToProps)(withStyles(styles)(AddCustomer));
