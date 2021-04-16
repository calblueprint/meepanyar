import { Typography } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, Redirect, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { CustomerRecord } from '../../lib/airtable/interface';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import moment from 'moment';
import { selectCurrentUserId } from '../../lib/redux/userData';
import OutlinedCardList from '../../components/OutlinedCardList';
import { updateCustomer } from '../../lib/airtable/request';


const styles = () =>
    createStyles({
        amountOwedContainer: {
            margin: '30px 0px'
        },
    });

interface EditStartingMeterProps extends RouteComponentProps {
    classes: { amountOwedContainer: string; };
}

function EditStartingMeter(props: EditStartingMeterProps) {
    const { classes } = props;
    const history = useHistory();
    const currentCustomer: CustomerRecord | undefined = useSelector(selectCurrentCustomer);
    const userId = useSelector(selectCurrentUserId);
    const [startingMeterAmount, setStartingMeterAmount] = useState('');
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    if (!currentCustomer || !userId) {
        return <Redirect to={'/customers'} />
    }

    const currentStartingMeterAmount = currentCustomer.startingMeterReading;

    const handleSetStartingMeterAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStartingMeterAmount(event.target.value as string);
    }

    const handleSetExplanation = (event: React.ChangeEvent<{ value: unknown }>) => {
        setExplanation(event.target.value as string);
    }

    const handleSubmit = (event: React.MouseEvent) => {
        // Prevent page refresh on submit
        event.preventDefault();

        const newStartingMeterAmount = parseFloat(startingMeterAmount);
        if (isNaN(newStartingMeterAmount) || !explanation) {
            setErrorMessage('Updated Starting Meter must be a number and Reason for Change must be filled out');
            return;
        } else {
            setLoading(true);
        }

        const customerRecordUpdates = {
            startingMeterReading: newStartingMeterAmount,
            startingMeterLastChanged: moment().toISOString()
        }

        const customerUpdate = {
            dateUpdated: moment().toISOString(),
            customerId: currentCustomer.id,
            explanation,
            userId,
        };

        updateCustomer(currentCustomer.id, customerRecordUpdates, customerUpdate).then(history.goBack);
    }

    const cardInfo = [{
        number: currentStartingMeterAmount.toString(),
        label: 'Current Starting Meter',
        unit: 'Kwh',
    }]

    return (
        <BaseScreen title="Edit Starting Meter" leftIcon="backNav">
            <div className={classes.amountOwedContainer}>
                <OutlinedCardList info={cardInfo} />
            </div>
            <TextField label='Updated Starting Meter' unit='kWh' id={'amount-metered'} placeholder='e.g. 100' type='number' required onChange={handleSetStartingMeterAmount} />
            <TextField label='Reason for change' id={'reason-for-change'} placeholder='e.g. reset broken meter' required onChange={handleSetExplanation} />
            <Button label={'UPDATE'} onClick={handleSubmit} loading={loading} />
            {errorMessage && <Typography color='error' align='center'> {errorMessage} </Typography>}
        </BaseScreen>
    );
}

export default withStyles(styles)(EditStartingMeter);