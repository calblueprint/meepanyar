import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core';
import * as Styles from "../styles/HomeInfoStyles";
import HomeInfoRow from "./HomeInfoRow";

type HomeInfoProps = {
    customer: string,
    payment: string,
    unpaid: string,
    incidents: string
}

const HomeInfoCard = ({ customer, payment, unpaid, incidents }: HomeInfoProps) =>

    <StylesProvider injectFirst>
        <Styles.MainCard elevation={0}>
            <HomeInfoRow amount={customer} name={"Customers to Charge"} />
            <HomeInfoRow amount={payment} name={"Outstanding Payments"} />
            <HomeInfoRow amount={unpaid} name={"Unpaid Reports"} />
            <HomeInfoRow amount={incidents} name={"Unresolved Incidents"} />
        </Styles.MainCard>
    </StylesProvider>;

export default HomeInfoCard;
