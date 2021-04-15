import { Card, CardContent, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserRecord } from '../../../lib/airtable/interface'

const styles = makeStyles((theme: Theme) =>
    createStyles({
        cardContent: {
            flex: 1,
            alignItems: 'center',
            display: 'flex',
            paddingRight: theme.spacing(1),
            '&:last-child': {
                paddingBottom: theme.spacing(2),
            },
        },
        leftContent: {
            flex: 1,
            marginRight: theme.spacing(1),
        },
        cardContainer: {
            borderRadius: 6,
            display: 'flex',
            marginBottom: theme.spacing(1),
        },
    }));

interface UserCardProps {
    user: UserRecord;
}

function UserCard(props: UserCardProps) {
    const classes = styles();
    const { user } = props;

    // TODO: Currently no profile picture 

    return (
        <Card variant="outlined" className={classes.cardContainer}>
            <Link style={{ flex: 1 }} to={{ pathname: '/profile/site/user-information/user', state: { user } }} >
                <CardContent className={classes.cardContent}>
                    <div className={classes.leftContent}>
                        <Typography color="textPrimary">
                            {user.username}
                        </Typography>
                    </div>
                    <ArrowForwardIosIcon fontSize='small' color="secondary" />
                </CardContent>
            </Link>
        </Card >
    );
}

export default UserCard;