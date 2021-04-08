import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';


interface PastReportButtonProps {
    classes: { root: string; text: string };
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '90px',
            height: '60px',
            border: '1px solid',
            borderColor: theme.palette.primary.main,
            borderRadius: '8px',
            padding: '18px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        text: {
            fontSize: '14px',
            color: theme.palette.primary.main,
        }
    });

function PastReportButton(props: PastReportButtonProps) {
    const { classes } = props;
    return (
        <ButtonBase className={classes.root}>
            <Typography className={classes.text}>
                Past Reports
            </Typography>
        </ButtonBase >
    );
}

export default withStyles(styles)(PastReportButton);
