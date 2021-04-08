import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';

const styles = (theme: Theme) =>
    createStyles({
        cardContent: {
            flex: 1,
            padding: 16,
        },
        arrow: {
            color: theme.palette.text.primary,
        },
        cardContainer: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            width: '100%',
            marginBottom: 10
        },
    });

interface ProfileCardProps {
    classes: { arrow: string; cardContent: string; cardContainer: string; };
    cardContent: string;
}

function ProfileCard(props: ProfileCardProps) {
    const { classes, cardContent } = props;

    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardContent}>
                <Typography variant="body1">{cardContent}</Typography>
            </div>
            <IconButton size="small">
                <ArrowForwardIosIcon className={classes.arrow} fontSize="small" />
            </IconButton>
        </div>
    );
}

export default withStyles(styles)(ProfileCard);