import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, IconButton, StylesProvider } from '@material-ui/core';
import * as Styles from "../styles/HomeInfoStyles";


type HomeInfoProps = {
    amount: string,
    name: string,
}

const HomeInfoRow = ({ amount, name }: HomeInfoProps) =>
    <StylesProvider injectFirst>
        <Styles.CardRow>
            {amount === "0" ?
                <ButtonBase>
                    <Styles.CardCon>
                        <Styles.Error />
                        <Styles.RowTitleGrayedNum>
                            {amount}
                        </Styles.RowTitleGrayedNum>
                        <Styles.RowTitleGrayed>
                            {name}
                        </Styles.RowTitleGrayed>
                        <Styles.Arrow />
                    </Styles.CardCon>
                </ButtonBase>
                :
                <ButtonBase>
                    <Styles.CardCon>
                        <Styles.Check />
                        <Styles.RowTitleNum>
                            {amount}
                        </Styles.RowTitleNum>
                        <Styles.RowTitle>
                            {name}
                        </Styles.RowTitle>
                        <Styles.Arrow />
                    </Styles.CardCon>
                </ButtonBase>
            }

        </Styles.CardRow>
    </StylesProvider>;

export default HomeInfoRow;
