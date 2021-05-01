import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import TextField from '../../components/TextField';
import { MeterType } from '../../lib/redux/customerDataSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Button from '../../components/Button';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
import { useFormik } from 'formik';
import * as yup from 'yup';

export interface EditCustomerMeterState {
    meterType: string | undefined;
    meterNumber: string | undefined;
}

function EditCustomerMeter() {
    const intl = useInternationalization(); 
    const currentCustomer = useSelector(selectCurrentCustomer);
    const meterTypeMap = new Map<string, string>(); // English keys
    const revMeterTypeMap = new Map<string, string>(); // Native device language as keys
    Object.values(MeterType).forEach(meter => {
        meterTypeMap.set(meter, intl(meter));
        revMeterTypeMap.set(intl(meter), meter);
    });

    const validationSchema = yup.object({
        meterType: yup.string().oneOf([meterTypeMap.get(MeterType.NO_METER), meterTypeMap.get(MeterType.SMART_METER), meterTypeMap.get(MeterType.ANALOG_METER)], intl(words.meter_type_must_be_one_of_smart_analog_or_no_meter)),
        meterNumber: yup.mixed() // Can be number or empty string
            .when('meterType', {
                is: (meterTypeMap.get(MeterType.ANALOG_METER) || meterTypeMap.get(MeterType.SMART_METER)),
                then: yup.mixed().required(intl(words.please_enter_a_meter_number)),
            })
    });
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
        const meterTypeKey: string = revMeterTypeMap.get(meterType) as string;
        history.push('tariff-plans', { meterNumber, meterTypeKey, goBack: -2 })
    }

    return (
        <BaseScreen title={intl(words.edit_customer)} leftIcon="backNav">
            <form noValidate onSubmit={formik.handleSubmit}>

                <FormControl
                    required
                    variant="outlined"
                    style={{ width: '100%' }}
                >
                    <InputLabel>{intl(words.x_type, words.meter)}</InputLabel>
                    <Select
                        onChange={(event) => {
                            const meterType = event.target.value as string;
                            formik.setFieldValue('meterType', meterType);

                            // Clear the meterNumber if NO_METER is selected
                            if (meterType === meterTypeMap.get(MeterType.NO_METER)) {
                                formik.setFieldValue('meterNumber', '')
                            }
                        }}
                        label={intl(words.x_type, words.meter)}
                        id='meterType'
                        required
                        value={formik.values.meterType}
                    >
                        <MenuItem value={meterTypeMap.get(MeterType.ANALOG_METER)}>{intl(words.analog_meter)}</MenuItem>
                        <MenuItem value={meterTypeMap.get(MeterType.SMART_METER)}>{intl(words.smart_meter)}</MenuItem>
                        <MenuItem value={meterTypeMap.get(MeterType.NO_METER)}>{intl(words.no_meter)}</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label={intl(words.meter_number)}
                    id={'meterNumber'}
                    placeholder='Input'
                    value={formik.values.meterNumber}
                    disabled={formik.values.meterType === meterTypeMap.get(MeterType.NO_METER)}
                    required={formik.values.meterType !== meterTypeMap.get(MeterType.NO_METER)}
                    error={formik.touched.meterNumber && Boolean(formik.errors.meterNumber)}
                    helperText={formik.touched.meterNumber && formik.errors.meterNumber}
                    onChange={formik.handleChange}
                />

                <Button label={intl(words.next)} fullWidth />
            </form>
        </BaseScreen>
    );
}

export default EditCustomerMeter;
