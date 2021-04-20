import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import TextField from '../../components/TextField';
import { MeterType } from '../../lib/redux/customerDataSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Button from '../../components/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';

export interface EditCustomerMeterState {
    meterType: string | undefined;
    meterNumber: string | undefined;
}

const validationSchema = yup.object({
    meterType: yup.string().oneOf([MeterType.NO_METER, MeterType.SMART_METER, MeterType.ANALOG_METER], 'Meter Type must be one of Smart, Analog, or No Meter'),
    meterNumber: yup.mixed() // Can be number or empty string
        .when('meterType', {
            is: (MeterType.ANALOG_METER || MeterType.SMART_METER),
            then: yup.mixed().required('Please enter a meter number'),
        })
});

function EditCustomerMeter() {

    const currentCustomer = useSelector(selectCurrentCustomer);

    const formik = useFormik({
        initialValues: {
            meterType: currentCustomer?.meterType,
            meterNumber: currentCustomer?.meterNumber ? currentCustomer.meterNumber.toString() : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    })
    const history = useHistory();

    if (!currentCustomer) {
        return <Redirect to='/customers' />
    }

    const handleSubmit = (values: any) => {
        const { meterNumber, meterType } = values;
        history.push('tariff-plans', { meterNumber, meterType, goBack: -2 })
    }

    return (
        <BaseScreen title="Edit Customer" leftIcon="backNav">
            <form noValidate onSubmit={formik.handleSubmit}>

                <FormControl
                    required
                    variant="outlined"
                    style={{ width: '100%' }}
                >
                    <InputLabel>Meter Type</InputLabel>
                    <Select
                        onChange={(event) => {
                            const meterType = event.target.value as string;
                            formik.setFieldValue('meterType', meterType)

                            // Clear the meterNumber if NO_METER is selected
                            if (meterType === MeterType.NO_METER) {
                                formik.setFieldValue('meterNumber', '')
                            }
                        }}
                        label={'Meter Type'}
                        id='meterType'
                        required
                        value={formik.values.meterType}
                    >
                        <MenuItem hidden value={MeterType.INACTIVE}>Inactive</MenuItem>
                        <MenuItem value={MeterType.ANALOG_METER}>Analog Meter</MenuItem>
                        <MenuItem value={MeterType.SMART_METER}>Smart Meter</MenuItem>
                        <MenuItem value={MeterType.NO_METER}>No Meter</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label='Meter Number'
                    id={'meterNumber'}
                    placeholder='Input'
                    value={formik.values.meterNumber}
                    disabled={formik.values.meterType === MeterType.INACTIVE || formik.values.meterType === MeterType.NO_METER}
                    required={formik.values.meterType !== MeterType.INACTIVE && formik.values.meterType !== MeterType.NO_METER}
                    error={formik.touched.meterNumber && Boolean(formik.errors.meterNumber)}
                    helperText={formik.touched.meterNumber && formik.errors.meterNumber}
                    onChange={formik.handleChange}
                />

                <Button label='Next' />
            </form>
        </BaseScreen>
    );
}

export default EditCustomerMeter;
