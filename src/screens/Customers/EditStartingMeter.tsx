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

const validationSchema = yup.object({
    startingMeterAmount: yup.number()
        .min(0, 'Please enter a positive number or 0')
        .required('Please enter a new starting meter number'),
    explanation: yup.string().required('Please provide a reason for the change')
});

function EditStartingMeter(props: EditStartingMeterProps) {
    const { classes } = props;
    const history = useHistory();
    const currentCustomer: CustomerRecord | undefined = useSelector(selectCurrentCustomer);
    const userId = useSelector(selectCurrentUserId);
    const [loading, setLoading] = useState(false);

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
        label: 'Current Starting Meter',
        unit: 'kWh',
    }]

    return (
        <BaseScreen title="Edit Starting Meter" leftIcon="backNav">
            <div className={classes.amountOwedContainer}>
                <OutlinedCardList info={cardInfo} />
            </div>
            <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    label='Updated Starting Meter'
                    unit='kWh'
                    id={'startingMeterAmount'}
                    placeholder='e.g. 100'
                    type='number'
                    required
                    value={formik.values.startingMeterAmount}
                    error={formik.touched.startingMeterAmount && Boolean(formik.errors.startingMeterAmount)}
                    helperText={formik.touched.startingMeterAmount && formik.errors.startingMeterAmount}
                    onChange={formik.handleChange}
                />
                <TextField
                    label='Reason for change'
                    id={'explanation'}
                    placeholder='e.g. reset broken meter'
                    required
                    value={formik.values.explanation}
                    error={formik.touched.explanation && Boolean(formik.errors.explanation)}
                    helperText={formik.touched.explanation && formik.errors.explanation}
                    onChange={formik.handleChange}
                />
                <Button label={'Update'} loading={loading} />
            </form>
        </BaseScreen>
    );
}

export default withStyles(styles)(EditStartingMeter);