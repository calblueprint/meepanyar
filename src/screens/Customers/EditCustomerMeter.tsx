import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import TextField from '../../components/TextField';
import { MeterType } from '../../lib/redux/customerDataSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Button from '../../components/Button';


function EditCustomerMeter() {
    const currentCustomer = useSelector(selectCurrentCustomer);
    const [meterType, setMeterType] = useState(currentCustomer?.meterType);
    const [meterNumber, setMeterNumber] = useState(currentCustomer?.meterNumber.toString());
    const history = useHistory();

    if (!currentCustomer) {
        return <Redirect to='/customers' />
    }

    const handleSelectMeterType = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedMeterType: MeterType = event.target.value as MeterType;
        setMeterType(selectedMeterType);

        if (selectedMeterType === MeterType.NO_METER) {
            setMeterNumber('')
        }
    }

    const handleMeterNumberInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setMeterNumber(event.target.value as string);
    }

    const handleClick = (event: React.MouseEvent) => {
        console.log("Meter Number: ", meterNumber);
        console.log("Meter Type: ", meterType);
    }

    return (
        <BaseScreen title="Edit Customer" leftIcon="backNav">
            <FormControl
                required
                variant="outlined"
                style={{ width: '100%' }}
            >
                <InputLabel>Meter Type</InputLabel>
                <Select onChange={handleSelectMeterType} label={'Meter Type'} value={meterType}>
                    <MenuItem hidden value={MeterType.INACTIVE}>Inactive</MenuItem>
                    <MenuItem value={MeterType.ANALOG_METER}>Analog Meter</MenuItem>
                    <MenuItem value={MeterType.SMART_METER}>Smart Meter</MenuItem>
                    <MenuItem value={MeterType.NO_METER}>No Meter</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label='Meter Number'
                id={'meter-number'}
                placeholder='Input'
                value={meterNumber}
                disabled={meterType === MeterType.INACTIVE || meterType === MeterType.NO_METER}
                required={meterType !== MeterType.INACTIVE && meterType !== MeterType.NO_METER}
                onChange={handleMeterNumberInput}
            />

            <Button label='Next' onClick={handleClick} />
        </BaseScreen>
    );
}

export default EditCustomerMeter;
