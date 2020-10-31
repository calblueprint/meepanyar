import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, IconButton, StylesProvider } from '@material-ui/core';
import * as Styles from "../styles/FinSumStyles";


const FinSumCard = () =>

    <StylesProvider injectFirst>
        <Styles.SingleCard>
            <Styles.CardCon>
                <Styles.InsideText>
                    Financial Summary
                </Styles.InsideText>
            </Styles.CardCon>
            <CardActions>
                <IconButton><Styles.Arrow /></IconButton>
            </CardActions>
        </Styles.SingleCard>
    </StylesProvider>;

export default FinSumCard;
