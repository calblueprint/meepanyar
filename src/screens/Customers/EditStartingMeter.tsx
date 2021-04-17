import { Theme, Typography } from '@material-ui/core';
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
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';


const styles = (theme: Theme) =>
    createStyles({
        amountOwedContainer: {
            margin: theme.spacing(3, 0)
        },
    });

interface EditStartingMeterProps extends RouteComponentProps {
    classes: { amountOwedContainer: string; };
}

function EditStartingMeter(props: EditStartingMeterProps) {
    const intl = useInternationalization(); 
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
            setErrorMessage(intl(words.updated_starting_meter_must_be_a_number_and_reason_for_change_must_be_filled_out));
            return;
        }
        setLoading(true);

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
        label: intl(words.current_x, words.starting_meter),
        unit: words.kwh,
    }]

    return (
        <BaseScreen title={intl(words.edit_x, words.starting_meter)} leftIcon="backNav">
            <div className={classes.amountOwedContainer}>
                <OutlinedCardList info={cardInfo} />
            </div>
            <TextField
                label={intl(words.updated_x, words.starting_meter)}
                unit={intl(words.kwh)}
                id={'amount-metered'}
                placeholder={intl(words.eg_x, '100')}
                type='number'
                required
                value={startingMeterAmount}
                onChange={handleSetStartingMeterAmount}
            />
            <TextField
                label={intl(words.reason_for_change)}
                id={'reason-for-change'}
                placeholder={intl(words.eg_x, words.reset_broken_meter)}
                required
                value={explanation}
                onChange={handleSetExplanation}
            />
            <Button label={intl(words.update)} onClick={handleSubmit} loading={loading} errorMessage={errorMessage} />
        </BaseScreen>
    );
}

export default withStyles(styles)(EditStartingMeter);