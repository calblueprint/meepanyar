import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, IconButton, StylesProvider, ButtonBase } from '@material-ui/core';
import * as Styles from "../styles/FinSumStyles";


const FinSumCard = () =>

    <StylesProvider injectFirst>
        <Styles.SingleCard elevation={0}>
            <ButtonBase>
                <Styles.CardCon>
                    <Styles.InsideText>
                        Financial Summary
                    </Styles.InsideText>
                    <Styles.Arrow />
                </Styles.CardCon>
            </ButtonBase>
        </Styles.SingleCard>
    </StylesProvider>;

export default FinSumCard;
