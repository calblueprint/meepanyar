import { Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import TextField from '../../components/TextField';

const styles = (theme: Theme) =>
    createStyles({
        content: {
            color: theme.palette.text.primary,
        },
        outlined: {
            padding: '15px 15px 10px',
            border: `1px solid ${theme.palette.text.secondary}`,
            borderRadius: '6px',
            marginTop: '10px',
        },
    });

interface AddPaymentProps extends RouteComponentProps {
    classes: { content: string; outlined: string; };
}


function AddPayment(props: AddPaymentProps) {
    const { classes } = props;

    return (
        <BaseScreen title="Add Payment" leftIcon="backNav">
            <div className={classes.content}>
                <form noValidate>
                    <div className={classes.outlined}>
                        <Typography variant="body1" style={{ marginBottom: 0 }}>
                            Today
              </Typography>
                        <Typography variant="body1" style={{ marginBottom: 15 }}>
                            00.00.0000
              </Typography>
                        <TextField label={'New Payment'} id={'new-payment'} />
                    </div>
                    <Button label={'ADD'} />
                </form>
            </div>
        </BaseScreen>
    );
}

export default withStyles(styles)(AddPayment);