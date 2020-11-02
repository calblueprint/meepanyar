import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, IconButton, StylesProvider, ButtonBase } from '@material-ui/core';
import * as Styles from "../styles/FinSumStyles";


const FinSumCard = () =>

    <StylesProvider injectFirst>
        <ButtonBase>
            <Styles.SingleCard elevation={0}>
                <Styles.CardCon>
                    <Styles.InsideText>
                        Financial Summary
                </Styles.InsideText>
                </Styles.CardCon>
                <CardActions>
                    <Styles.Arrow />
                </CardActions>
            </Styles.SingleCard>
        </ButtonBase>
    </StylesProvider>;

export default FinSumCard;
