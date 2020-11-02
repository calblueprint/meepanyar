import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, StylesProvider } from '@material-ui/core';
import * as Styles from "../styles/HomeInfoStyles";

type HomeInfoProps = {
    amount: string,
    name: string,
}

const HomeInfoRow = ({ amount, name }: HomeInfoProps) =>
    <StylesProvider injectFirst>
        <Styles.CardRow>
            {amount === "0" ?
                <Styles.CardCon>
                    <Styles.RowTitleGrayed>
                        {amount}
                    </Styles.RowTitleGrayed>
                    <Styles.RowTitleGrayed>
                        {name}
                    </Styles.RowTitleGrayed>
                    <Styles.Error />
                    <IconButton><Styles.Arrow /></IconButton>
                </Styles.CardCon>
                :
                <Styles.CardCon>
                    <Styles.RowTitle>
                        {amount}
                    </Styles.RowTitle>
                    <Styles.RowTitle>
                        {name}
                    </Styles.RowTitle>
                    <Styles.Check />
                    <IconButton><Styles.Arrow /></IconButton>
                </Styles.CardCon>
            }

        </Styles.CardRow>
    </StylesProvider>;

export default HomeInfoRow;
