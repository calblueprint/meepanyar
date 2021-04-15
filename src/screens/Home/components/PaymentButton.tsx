import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';


interface PaymentButtonProps {
    classes: { root: string; text: string, paymentText: string, content: string };
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            border: '1px solid',
            borderColor: theme.palette.primary.main,
            borderRadius: '6px',
            padding: '15px 15px',
            marginBottom: '12px',
        },
        text: {
            fontSize: theme.typography.body2.fontSize,
            color: theme.palette.error.dark,
        },
        paymentText: {
            fontSize: theme.typography.h2.fontSize,
            color: theme.palette.info.main,
        }, content: {
            display: 'flex',
            width: 'inherit',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'left',
            color: '#6A6A6A',
        },
    });

function PaymentButton(props: PaymentButtonProps) {
    const { classes } = props;
    return (
        <ButtonBase className={classes.root}>
            <div className={classes.content}>
                <div>
                    <Typography className={classes.text}>
                        Owed to MP
                </Typography>
                    <Typography className={classes.paymentText}>
                        6000Ks
                </Typography>
                </div>
                <AddRoundedIcon fontSize="large" color="primary" />
            </div>
        </ButtonBase >
    );
}

export default withStyles(styles)(PaymentButton);
