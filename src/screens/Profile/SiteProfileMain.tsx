import { List } from '@material-ui/core';
import React from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { useSelector } from 'react-redux';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';
import { Redirect } from 'react-router';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

function SiteProfileMain() {
    const intl = useInternationalization(); 
    const currentSite = useSelector(selectCurrentSiteInformation);

    if (!currentSite) {
        return <Redirect to='/login' />
    }

    return (
        <BaseScreen title={intl(words.site_information)} leftIcon="backNav">
            <List>
                <ListItemWrapper linkTo='/profile/site/name' leftText={intl(words.site_name)} rightText={currentSite.name} divider />
                <ListItemWrapper linkTo='/profile/site/tariff-plans' leftText={intl(words.tariff_plan)} divider />
                <ListItemWrapper linkTo='/profile/site/user-information' leftText={intl(words.user_information)} divider />
            </List>
        </BaseScreen>
    );
}

export default SiteProfileMain;