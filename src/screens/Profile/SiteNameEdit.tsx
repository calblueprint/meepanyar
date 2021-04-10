import { List } from '@material-ui/core';
import React from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { useSelector } from 'react-redux';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';

function SiteNameEdit() {
    const currentSite = useSelector(selectCurrentSiteInformation);
    const currentSiteName = currentSite ? currentSite.name : 'No Site';

    return (
        <BaseScreen title="Site Information" leftIcon="backNav">
            <List>
                <ListItemWrapper leftText='Site Name' rightText={currentSiteName} dense />
            </List>
        </BaseScreen>
    );
}

export default SiteNameEdit;