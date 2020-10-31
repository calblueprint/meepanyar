import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, IconButton, StylesProvider } from '@material-ui/core';
import * as Styles from "../styles/HomeInfoStyles";

type HomeInfoProps = {
    customer: string,
    payment: string,
    unpaid: string,
    incidents: string
}

const HomeInfoCard = ({ customer, payment, unpaid, incidents }: HomeInfoProps) =>

    <StylesProvider injectFirst>
        <Styles.MainCard elevation={0}>
            <Styles.CardRow>
                <Styles.CardCon>
                    <Styles.RowTitle>
                        hi
                    </Styles.RowTitle>
                </Styles.CardCon>
            </Styles.CardRow>
            <Styles.CardRow>
                <Styles.CardCon>
                    <Styles.RowTitle>
                        hi
                </Styles.RowTitle>
                </Styles.CardCon>
            </Styles.CardRow>
            <Styles.CardRow>
                <Styles.CardCon>
                    <Styles.RowTitle>
                        hi
                </Styles.RowTitle>
                    <Styles.Arrow />
                </Styles.CardCon>
            </Styles.CardRow>
            <Styles.CardRow>
                <Styles.CardCon>
                    <Styles.RowTitle>
                        hi
                </Styles.RowTitle>
                </Styles.CardCon>
            </Styles.CardRow>
        </Styles.MainCard>
    </StylesProvider>;

export default HomeInfoCard;
