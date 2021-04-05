import { Typography } from '@material-ui/core';
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

const styles = (theme: Theme) =>
    createStyles({
        content: {
            color: theme.palette.text.primary,
        },
        amountOwedContainer: {
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${theme.palette.text.secondary}`,
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '20px',
        },
        outlined: {
            padding: '15px 15px 10px',
            border: `1px solid ${theme.palette.text.secondary}`,
            borderRadius: '6px',
            marginTop: '10px',
        },
    });

interface AddPaymentProps extends RouteComponentProps {
    classes: { content: string; outlined: string; amountOwedContainer: string; };
}


function AddPayment(props: AddPaymentProps) {
    const { classes } = props;
    const history = useHistory();

    const currentCustomer: CustomerRecord | undefined = useSelector(selectCurrentCustomer);
    const currentUserId: string | undefined = useSelector(selectCurrentUserId);
    const [paymentAmount, setPaymentAmount] = useState(0.0);

    if (!currentCustomer || !currentUserId) {
        return <Redirect to={'/customers'} />
    }

    const handleSetPaymentAmountInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPaymentAmount(parseFloat(event.target.value as string) || 0);
    }

    const handleSubmit = (event: React.MouseEvent) => {
        // Prevent page refresh on submit
        event.preventDefault();

        const payment = JSON.parse(JSON.stringify(EMPTY_PAYMENT));
        payment.amount = paymentAmount;
        payment.date = moment().toISOString();
        payment.billedToId = currentCustomer.id;
        payment.collectedById = currentUserId;

        createPaymentAndUpdateCustomerBalance(payment, currentCustomer).then(history.goBack);
    }

    const totalAmountOwed = currentCustomer.totalAmountBilledfromInvoices - currentCustomer.totalAmountPaidfromPayments;

    return (
        <BaseScreen title="Add Payment" leftIcon="backNav">
            <div className={classes.content}>
                <div className={classes.amountOwedContainer}>
                    <Typography variant='body1' gutterBottom>
                        Remaining Balance
                    </Typography>
                    <Typography variant='h1'>
                        {totalAmountOwed} Ks
                    </Typography>
                </div>

                <form noValidate>
                    <TextField label={'Amount Paid (Ks)'} id={'new-payment'} primary={true} onChange={handleSetPaymentAmountInput} />
                    <Button label={'+ ADD PAYMENT'} onClick={handleSubmit} />
                </form>
            </div>
        </BaseScreen>
    );
}

export default withStyles(styles)(AddPayment);