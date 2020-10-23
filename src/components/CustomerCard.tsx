import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, IconButton } from '@material-ui/core';
import * as Styles from "../styles/CustomerCardStyles";


type CardProps = {
    name: string,
    amount: number,
    date: string,
}
const CustomerCard = ({ name, amount, date }: CardProps) =>

    <Styles.SingleCard>
        <Styles.CardCon>
            <Styles.TitleText>
                {name}
            </Styles.TitleText>
            <Styles.InsideText>
                Total owed: {amount}
            </Styles.InsideText>
            <Styles.InsideText>
                Last Updated: {date}
            </Styles.InsideText>
        </Styles.CardCon>
        <CardActions>
            <IconButton><Styles.Arrow /></IconButton>
        </CardActions>
    </Styles.SingleCard>;

export default CustomerCard;
