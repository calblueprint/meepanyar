import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textContent: {
            display: 'flex',
            flex: 1,
            padding: 12,
        },
        primaryTextContent: {
            flex: 1,
            textAlign: 'right',
        },
        arrow: {
            color: theme.palette.text.primary,
        },
        cardContainer: (props: ProfileCardProps) => ({
            borderBottom: props.noBottomBorder ? '' : `1px solid ${theme.palette.divider}`,
            display: 'flex',
            width: '100%',
            marginBottom: 10
        }),
    }));

interface ProfileCardProps {
    leftText: string;
    rightText?: string;
    chevron?: boolean;
    noBottomBorder?: boolean;
}

function ProfileCard(props: ProfileCardProps) {
    const { leftText, rightText, chevron } = props;
    const classes = useStyles(props);

    const renderChevron = () => (<IconButton size="small">
        <ArrowForwardIosIcon className={classes.arrow} fontSize="small" />
    </IconButton>)

    const renderRightContent = () => (<div className={classes.primaryTextContent}>
        <Typography variant="body1" color='textSecondary'>{rightText}</Typography>
    </div>)

    return (
        <div className={classes.cardContainer}>
            <div className={classes.textContent}>
                <Typography variant="body1" color='textPrimary'>{leftText}</Typography>
                {rightText ? renderRightContent() : null}
            </div>
            {chevron ? renderChevron() : null}
        </div>
    );
}

export default ProfileCard;