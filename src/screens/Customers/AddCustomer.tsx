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
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
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
  const intl = useInternationalization(); 
  const { classes } = props;
  const history = useHistory();
  const allCustomerNumbers = useSelector(selectAllCustomersArray).map(customer => customer.customerNumber);
  // Two-way map for developers in order to ensure English keys in the AirTable while still providing frontend translations.
  const meterTypeMap = new Map<string, string>(); // English as keys
  const revMeterTypeMap = new Map<string, string>(); // Native device language as keys
  Object.values(MeterType).forEach(meter => {
    meterTypeMap.set(meter, intl(meter));
    revMeterTypeMap.set(intl(meter), meter);
  });

  const validationSchema = yup.object({
    customerName: yup.string().required(intl(words.name_can_not_be_blank)),
    selectedMeterType:
      yup.string().oneOf([meterTypeMap.get(MeterType.NO_METER), meterTypeMap.get(MeterType.SMART_METER), meterTypeMap.get(MeterType.ANALOG_METER)], intl(words.meter_type_must_be_one_of_smart_analog_or_no_meter)),
    selectedTariffPlanId: yup.string().required(intl(words.must_select_a_tariff_plan)),
    meterNumber: yup.mixed().when('selectedMeterType', {
      is: (meterTypeMap.get(MeterType.SMART_METER) || meterTypeMap.get(MeterType.ANALOG_METER)),
      then: yup.mixed().required(intl(words.please_enter_a_x, words.valid_amount))
    }),
    customerNumber: yup.number()
      .min(0, intl(words.please_enter_a_x, words.positive_number))
      .notOneOf(allCustomerNumbers, intl(words.that_customer_number_is_used_by_another_customer))
      .required(intl(words.customer_number_is_required))
  });

  const formik = useFormik({
    initialValues: {
      customerName: '',
      customerNumber: '',
      selectedMeterType: meterTypeMap.get(MeterType.NO_METER) as string,
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
    customer.isactive = true
    customer.name = customerName;
    customer.customerNumber = parseInt(customerNumber);
    customer.meterType = revMeterTypeMap.get(selectedMeterType); // Map back to English
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
    const meterTypeKey: string = revMeterTypeMap.get(formik.values.selectedMeterType) as string;
    availableTariffPlans = availableTariffPlans.filter((plan) => plan.meterTypes && plan.meterTypes.includes(meterTypeKey));
    return (
      <Select
        id='selectedTariffPlanId'
        onChange={(event) => formik.setFieldValue('selectedTariffPlanId', event.target.value)} label={intl(words.tariff_plan)}
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
    <BaseScreen title={intl(words.add_x, words.new_customer)} leftIcon="backNav">
      <BaseScrollView>
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className={classes.twoColumnContainer}>
            <div style={{ marginRight: 10, flex: 2 }}>
              <TextField
                label={intl(words.name)}
                id={'customerName'}
                placeholder={intl(words.eg_x, 'Tom')}
                onChange={formik.handleChange}
                value={formik.values.customerName}
                error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                helperText={formik.touched.customerName && formik.errors.customerName}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                label={intl(words.number)}
                id={'customerNumber'}
                placeholder={intl(words.eg_x, '12')}
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
              <InputLabel>{intl(words.x_type, words.meter)}</InputLabel>
              <Select
                onChange={(event) => {
                  const meterType = event.target.value as string;
                  formik.setFieldValue('selectedMeterType', meterType);

                  // Clear the meterNumber if NO_METER is selected
                  if (meterType === meterTypeMap.get(MeterType.NO_METER)) {
                    formik.setFieldValue('meterNumber', '')
                  }
                }}
                label={intl(words.x_type, words.meter)}
                id='selectedMeterType'
                value={formik.values.selectedMeterType}
              >
                <MenuItem value={meterTypeMap.get(MeterType.ANALOG_METER)}>{intl(words.analog_meter)}</MenuItem>
                <MenuItem value={meterTypeMap.get(MeterType.SMART_METER)}>{intl(words.smart_meter)}</MenuItem>
                <MenuItem value={meterTypeMap.get(MeterType.NO_METER)}>{intl(words.no_meter)}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.textContainer}>
            <TextField
              label={intl(words.meter_number)}
              id={'meterNumber'}
              placeholder={intl(words.eg_x, '15')}
              type="number"
              value={formik.values.meterNumber}
              onChange={formik.handleChange}
              error={formik.touched.meterNumber && Boolean(formik.errors.meterNumber)}
              helperText={formik.touched.meterNumber && formik.errors.meterNumber}
              disabled={formik.values.selectedMeterType === meterTypeMap.get(MeterType.NO_METER)}
              required={formik.values.selectedMeterType !== meterTypeMap.get(MeterType.NO_METER)}
            />
          </div>
          <div className={classes.selectContainer}>
            <FormControl
              variant="outlined"
              required
              className={classes.formControl}
            >
              <InputLabel>{intl(words.tariff_plan)}</InputLabel>
              {getTariffPlans()}
              <FormHelperText error>{formik.touched.selectedTariffPlanId && formik.errors.selectedTariffPlanId}</FormHelperText>
            </FormControl>
          </div>
          <div className={classes.buttonContainer}>
            <div className={classes.button}>
              <Button
                label={intl(words.add)}
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
