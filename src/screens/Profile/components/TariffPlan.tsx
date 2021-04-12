import { List } from '@material-ui/core';
import React from 'react';
import BaseScreen from '../../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../../components/ListItemWrapper';
import { useSelector } from 'react-redux';
import { selectCurrentSiteInformation } from '../../../lib/redux/siteData';
import { Redirect } from 'react-router';

function TariffPlan() {
    const currentSite = useSelector(selectCurrentSiteInformation);

    if (!currentSite) {
        return <Redirect to='/login' />
    }

    return (
        <BaseScreen title="Site Information" leftIcon="backNav">
            <List>
                <ListItemWrapper linkTo='/profile/site/name' leftText='Site Name' rightText={currentSite.name} divider />
                <ListItemWrapper linkTo='/profile/site/tariff-plans' leftText='Tariff Plan' divider />
                <ListItemWrapper linkTo='/profile/site/user-information' leftText='User Information' divider />
            </List>
        </BaseScreen>
    );
}

export default TariffPlan;