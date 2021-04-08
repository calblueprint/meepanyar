import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        leftContent: {
            flex: 1,
            padding: 12,
        },
        rightContent: {
            padding: 12,
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
    leftContent: string;
    rightContent?: string;
    chevron?: boolean;
    noBottomBorder?: boolean;
}

function ProfileCard(props: ProfileCardProps) {
    const { leftContent, rightContent, chevron } = props;
    const classes = useStyles(props);

    const renderChevron = () => (<IconButton size="small">
        <ArrowForwardIosIcon className={classes.arrow} fontSize="small" />
    </IconButton>)

    const renderRightContent = () => (            <div className={classes.rightContent}>
        <Typography variant="body1" color='textSecondary'>{rightContent}</Typography>
    </div>)

    return (
        <div className={classes.cardContainer}>
            <div className={classes.leftContent}>
                <Typography variant="body1" color='textPrimary'>{leftContent}</Typography>
            </div>
            {rightContent ? renderRightContent() : null}
            {chevron ? renderChevron() : null}
        </div>
    );
}

export default ProfileCard;