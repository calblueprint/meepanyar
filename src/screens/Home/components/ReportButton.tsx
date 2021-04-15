import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DescriptionIcon from '@material-ui/icons/Description';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';


interface ReportButtonProps {
    classes: { root: string; text: string };
}

const styles = (theme: Theme) =>
    createStyles({
        root: {

            background: theme.palette.primary.main,
            borderRadius: '8px',
            padding: '18px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        text: {
            fontSize: '14px',
            color: '#FFFFFF',
            marginLeft: '15px',
        }
    });

function ReportButton(props: ReportButtonProps) {
    const { classes } = props;
    return (
        <ButtonBase className={classes.root}>
            <DescriptionIcon style={{ fill: 'white' }} />
            <Typography className={classes.text}>
                Current Period
            </Typography>
        </ButtonBase >
    );
}

export default withStyles(styles)(ReportButton);
