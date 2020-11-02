import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core';
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
                    <Styles.Arrow />
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
                    <Styles.Arrow />
                </Styles.CardCon>
            }

        </Styles.CardRow>
    </StylesProvider>;

export default HomeInfoRow;
