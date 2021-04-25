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

import * as yup from 'yup';
import { useFormik } from 'formik';

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
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        startingMeterAmount: yup.number()
            .min(0, intl(words.please_enter_a_positive_number))
            .not([currentCustomer?.startingMeterReading], intl(words.starting_meter_is_currently_that_value))
            .required(intl(words.please_enter_a_new_starting_meter_number)),
        explanation: yup.string().required(intl(words.please_provide_a_reason_for_the_change))
    });

    const formik = useFormik({
        initialValues: {
            startingMeterAmount: '',
            explanation: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    })

    if (!currentCustomer || !userId) {
        return <Redirect to={'/customers'} />
    }

    const currentStartingMeterAmount = currentCustomer.startingMeterReading;

    const handleSubmit = (values: any) => {
        const { startingMeterAmount, explanation } = values;

        const newStartingMeterAmount = parseFloat(startingMeterAmount) || 0;
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
            <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    label={intl(words.updated_x, words.starting_meter)}
                    unit={intl(words.kwh)}
                    id={'startingMeterAmount'}
                    placeholder={intl(words.eg_x, '100')}
                    type='number'
                    required
                    value={formik.values.startingMeterAmount}
                    error={formik.touched.startingMeterAmount && Boolean(formik.errors.startingMeterAmount)}
                    helperText={formik.touched.startingMeterAmount && formik.errors.startingMeterAmount}
                    onChange={formik.handleChange}
                />
                <TextField
                    label={intl(words.reason_for_change)}
                    id={'explanation'}
                    placeholder={intl(words.eg_x, words.reset_broken_meter)}
                    required
                    value={formik.values.explanation}
                    error={formik.touched.explanation && Boolean(formik.errors.explanation)}
                    helperText={formik.touched.explanation && formik.errors.explanation}
                    onChange={formik.handleChange}
                />
                <Button label={intl(words.update)} loading={loading} fullWidth />
            </form>
        </BaseScreen>
    );
}

export default withStyles(styles)(EditStartingMeter);