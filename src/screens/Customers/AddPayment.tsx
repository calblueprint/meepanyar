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
    const [paymentAmount, setPaymentAmount] = useState(0.0);
    const [loading, setLoading] = useState(false);

    if (!currentCustomer || !currentUserId) {
        return <Redirect to={'/customers'} />
    }

    const handleSetPaymentAmountInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPaymentAmount(parseFloat(event.target.value as string) || 0);
    }

    // TODO: Error handling
    // TODO: making paymentAmount a required field
    // TODO: make this a controlled component
    const handleSubmit = (event: React.MouseEvent) => {
        // Prevent page refresh on submit
        event.preventDefault();
        setLoading(true);

        const payment = JSON.parse(JSON.stringify(EMPTY_PAYMENT));
        payment.amount = paymentAmount;
        payment.date = moment().toISOString();
        payment.billedToId = currentCustomer.id;
        payment.collectedById = currentUserId;

        createPaymentAndUpdateCustomerBalance(payment, currentCustomer).then(history.goBack);
    }

    const remainingBalance = currentCustomer.totalAmountBilledfromInvoices - currentCustomer.totalAmountPaidfromPayments;

    const cardInfo = [{ number: remainingBalance.toString(), label: intl(words.remaining_balance), unit: intl(words.ks) }]

    return (
        <BaseScreen title={intl(words.add_x, words.payment)} leftIcon="backNav">
            <div className={classes.amountOwedContainer}>
                <OutlinedCardList info={cardInfo} />
            </div>
            <TextField label={intl(words.amount_spent_paid) + ' (' + intl(words.ks) + ')'} id={'amount-paid'} onChange={handleSetPaymentAmountInput} />
            <Button label={intl(words.add_x, words.payment)} onClick={handleSubmit} loading={loading} />
        </BaseScreen>
    );
}

export default withStyles(styles)(AddPayment);