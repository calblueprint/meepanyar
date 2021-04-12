import { List } from '@material-ui/core';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { useSelector } from 'react-redux';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';

function SiteNameEdit() {
    const currentSite = useSelector(selectCurrentSiteInformation);
    const currentSiteName = currentSite ? currentSite.name : 'No Site';

    const [newSiteName, setNewSiteName] = useState(currentSiteName);

    const handleSiteNameInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewSiteName(event.target.value as string);
    }

    return (
        <BaseScreen title="Edit Site Information" leftIcon="backNav">
            <List>
                <ListItemWrapper
                    leftText='Site Name'
                    rightText={currentSiteName}
                    editable
                    dense
                    editValue={newSiteName}
                    onEditChange={handleSiteNameInput}
                    editInputId={'edit-site-name'}
                />
            </List>
        </BaseScreen>
    );
}

export default SiteNameEdit;