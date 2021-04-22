import { createStyles, FormControl, InputLabel, MenuItem, Select, Theme, FormHelperText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { SiteRecord } from '../../lib/airtable/interface';
import { createCustomer } from '../../lib/airtable/request';
import { setCurrentCustomerIdInRedux } from '../../lib/redux/customerData';
import { selectAllTariffPlansArray } from '../../lib/redux/siteDataSlice';
import { EMPTY_CUSTOMER, MeterType, selectAllCustomersArray } from '../../lib/redux/customerDataSlice';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';
import TariffPlanCard from '../Profile/components/TariffPlanCard';
import moment from 'moment';
import * as yup from 'yup';
import { useFormik } from 'formik';


const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      width: '100%',
    },
    disabledFormControl: {
      width: '100%',
      backgroundColor: theme.palette.background.default,
    },
    textContainer: {
      padding: '2px 0px',
    },
    selectContainer: {
      padding: '10px 0px',
    },
    twoColumnContainer: {
      flexDirection: 'row',
      display: 'flex',
    },
    buttonContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '10px',
    },
    button: {
      width: '70%',
    },
  });

interface AddCustomerProps extends RouteComponentProps {
  classes: { formControl: string, disabledFormControl: string, twoColumnContainer: string, textContainer: string, selectContainer: string, buttonContainer: string, button: string, };
  currentSite: SiteRecord;
  location: any;
}

function AddCustomer(props: AddCustomerProps) {
  const { classes } = props;
  const history = useHistory();
  const allCustomerNumbers = useSelector(selectAllCustomersArray).map(customer => customer.customerNumber);

  const validationSchema = yup.object({
    customerName: yup.string().required('Name can not be blank'),
    selectedMeterType:
      yup.string().oneOf([MeterType.NO_METER, MeterType.SMART_METER, MeterType.ANALOG_METER], 'Meter Type must be one of Smart, Analog, or No Meter'),
    selectedTariffPlanId: yup.string().required('Must select a tariff plan'),
    meterNumber: yup.mixed().when('selectedMeterType', {
      is: (MeterType.SMART_METER || MeterType.ANALOG_METER),
      then: yup.mixed().required('Please enter a meter number')
    }),
    customerNumber: yup.number()
      .min(0, 'Please enter a positive number')
      .notOneOf(allCustomerNumbers, 'That customer number is used by another customer')
      .required('Customer number is required')
  });

  const formik = useFormik({
    initialValues: {
      customerName: '',
      customerNumber: '',
      selectedMeterType: MeterType.NO_METER,
      meterNumber: '',
      selectedTariffPlanId: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  })

  const [loading, setLoading] = useState(false);
  const currentSite = useSelector(selectCurrentSiteInformation);
  const tariffPlans = useSelector(selectAllTariffPlansArray);
  tariffPlans.sort(function (a, b) {
    return b.numberOfCustomers - a.numberOfCustomers;
  });

  if (!currentSite) {
    return <Redirect to={'/customers'} />
  }

  const handleSubmit = (values: any) => {
    const { customerName, customerNumber, selectedMeterType, meterNumber, selectedTariffPlanId } = values;
    setLoading(true);

    // Make a deep copy of an empty customer record
    const customer = JSON.parse(JSON.stringify(EMPTY_CUSTOMER));
    customer.name = customerName;
    customer.customerNumber = parseInt(customerNumber);
    customer.meterType = selectedMeterType;
    customer.meterNumber = isNaN(parseInt(meterNumber)) ? null : parseInt(meterNumber);
    customer.tariffPlanId = selectedTariffPlanId;
    customer.startingMeterReading = 0;
    customer.startingMeterLastChanged = moment().toISOString();

    // Add other info necessary to create the Airtable record
    createCustomer({
      ...customer,
      siteId: currentSite.id
    }).then((id) => {
      setCurrentCustomerIdInRedux(id);
      history.replace(`customer`);
    });
  }

  const getTariffPlans = () => {
    let availableTariffPlans = tariffPlans;
    availableTariffPlans = availableTariffPlans.filter((plan) => plan.meterTypes && plan.meterTypes.includes(formik.values.selectedMeterType));
    return (
      <Select
        id='selectedTariffPlanId'
        onChange={(event) => formik.setFieldValue('selectedTariffPlanId', event.target.value)} label={'Tariff Plan'}
        value={formik.values.selectedTariffPlanId}
        error={formik.touched.selectedTariffPlanId && Boolean(formik.errors.selectedTariffPlanId)}
      >
        {availableTariffPlans.map((plan) =>
          <MenuItem key={plan.id} value={plan.id}>
            <TariffPlanCard tariffPlan={plan} />
          </MenuItem>
        )}
      </Select>
    );
  }

  return (
    <BaseScreen title="Add New Customer" leftIcon="backNav">
      <BaseScrollView>
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className={classes.twoColumnContainer}>
            <div style={{ marginRight: 10, flex: 2 }}>
              <TextField
                label={'Name'}
                id={'customerName'}
                placeholder={'e.g. Tom'}
                onChange={formik.handleChange}
                value={formik.values.customerName}
                error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                helperText={formik.touched.customerName && formik.errors.customerName}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                label={'Number'}
                id={'customerNumber'}
                placeholder={'e.g. 12'}
                type="number"
                onChange={formik.handleChange}
                value={formik.values.customerNumber}
                error={formik.touched.customerNumber && Boolean(formik.errors.customerNumber)}
                helperText={formik.touched.customerNumber && formik.errors.customerNumber}
                required
              />
            </div>
          </div>
          <div className={classes.selectContainer}>
            <FormControl
              required
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel>Meter Type</InputLabel>
              <Select
                onChange={(event) => {
                  const meterType = event.target.value as string;
                  formik.setFieldValue('selectedMeterType', meterType)

                  // Clear the meterNumber if NO_METER is selected
                  if (meterType === MeterType.NO_METER) {
                    formik.setFieldValue('meterNumber', '')
                  }
                }}
                label={'Meter Type'}
                id='selectedMeterType'
                value={formik.values.selectedMeterType}
              >
                <MenuItem value={MeterType.ANALOG_METER}>Analog Meter</MenuItem>
                <MenuItem value={MeterType.SMART_METER}>Smart Meter</MenuItem>
                <MenuItem value={MeterType.NO_METER}>No Meter</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.textContainer}>
            <TextField
              label={'Meter Number'}
              id={'meterNumber'}
              placeholder={'e.g. 15'}
              type="number"
              value={formik.values.meterNumber}
              onChange={formik.handleChange}
              error={formik.touched.meterNumber && Boolean(formik.errors.meterNumber)}
              helperText={formik.touched.meterNumber && formik.errors.meterNumber}
              disabled={formik.values.selectedMeterType === MeterType.NO_METER}
              required={formik.values.selectedMeterType !== MeterType.NO_METER}
            />
          </div>
          <div className={classes.selectContainer}>
            <FormControl
              variant="outlined"
              required
              className={classes.formControl}
            >
              <InputLabel>Tariff Plan</InputLabel>
              {getTariffPlans()}
              <FormHelperText error>{formik.touched.selectedTariffPlanId && formik.errors.selectedTariffPlanId}</FormHelperText>
            </FormControl>
          </div>
          <div className={classes.buttonContainer}>
            <div className={classes.button}>
              <Button
                label={'Add'}
                fullWidth
                loading={loading}
              />
            </div>
          </div>
        </form>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(AddCustomer);
