import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, Redirect, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { selectCurrentCustomer } from '../../lib/redux/customerData';
import { CustomerRecord } from '../../lib/airtable/interface';
import { EMPTY_PAYMENT } from '../../lib/redux/customerDataSlice';
import { selectCurrentUserId } from '../../lib/redux/userData';
import { createPaymentAndUpdateCustomerBalance } from '../../lib/airtable/request';
import moment from 'moment';
import OutlinedCardList from '../../components/OutlinedCardList';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { roundToString } from '../../lib/utils/utils';

const styles = (theme: Theme) =>
    createStyles({
        amountOwedContainer: {
            margin: '20px 0px'
        },
    });

interface AddPaymentProps extends RouteComponentProps {
    classes: { amountOwedContainer: string; };
}


function AddPayment(props: AddPaymentProps) {
    const intl = useInternationalization(); 
    const { classes } = props;
    const history = useHistory();

    const currentCustomer: CustomerRecord | undefined = useSelector(selectCurrentCustomer);
    const currentUserId: string | undefined = useSelector(selectCurrentUserId);
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        amountPaid: yup.number()
            .min(0, intl(words.please_enter_a_positive_number))
            .max(currentCustomer?.outstandingBalance || 0, intl(words.you_may_not_pay_greater_than_the_remaining_balance))
            .required(intl(words.please_enter_a_valid_amount))
    });

    const formik = useFormik({
        initialValues: {
            amountPaid: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    })


    if (!currentCustomer || !currentUserId) {
        return <Redirect to={'/customers'} />
    }

    const handleSubmit = (values: any) => {
        const { amountPaid } = values;
        // Prevent page refresh on submit
        setLoading(true);

        const payment = JSON.parse(JSON.stringify(EMPTY_PAYMENT));
        payment.amount = parseFloat(amountPaid);
        payment.date = moment().toISOString();
        payment.billedToId = currentCustomer.id;
        payment.collectedById = currentUserId;

        createPaymentAndUpdateCustomerBalance(payment, currentCustomer).then(history.goBack);
    }

    const cardInfo = [{ number: roundToString(currentCustomer.outstandingBalance), label: intl(words.remaining_balance), unit: intl(words.ks) }]

    return (
        <BaseScreen title={intl(words.add_x, words.payment)} leftIcon="backNav">
            <div className={classes.amountOwedContainer}>
                <OutlinedCardList info={cardInfo} />
            </div>
            <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    label={`${intl(words.amount_spent)} (${intl(words.ks)})`}
                    id={'amountPaid'}
                    onChange={formik.handleChange}
                    value={formik.values.amountPaid}
                    error={formik.touched.amountPaid && Boolean(formik.errors.amountPaid)}
                    type='number'
                    required
                    helperText={formik.touched.amountPaid && formik.errors.amountPaid}
                />
                <Button label={`+ ${intl(words.add_x, words.payment)}`} loading={loading} fullWidth />
            </form>
        </BaseScreen>
    );
}

export default withStyles(styles)(AddPayment);
