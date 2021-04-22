import { List, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectCurrentSiteInformation, updateSiteInRedux } from '../../lib/redux/siteData';
import Button from '../../components/Button';
import { updateSite } from '../../lib/airtable/request';


function EditSiteInformation() {
    const history = useHistory();

    const currentSite = useSelector(selectCurrentSiteInformation);
    const currentSiteName = currentSite ? currentSite.name : 'No Site';

    const [newSiteName, setNewSiteName] = useState(currentSiteName);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSiteNameInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewSiteName(event.target.value as string);
    }

    const handleSubmit = async (event: React.MouseEvent) => {
        event.preventDefault();

        if (newSiteName === '') {
            setErrorMessage('All fields must be filled with numbers');
            return
        } else {
            setLoading(true);
        }

        const newSiteInformation = {
            name: newSiteName
        }

        try {
            await updateSite(currentSite.id, newSiteInformation);

        } catch (error) {
            console.error("Error occurred while attempting to update site information: ", error);
            console.log('Network errors will have their requests retried when back online');
        } finally {
            // We naively update the tariff plan in redux and do proper authentication on the backend
            // to make sure only admins can successfully change tariff plans
            updateSiteInRedux({ id: currentSite.id, ...newSiteInformation });
            history.goBack()
        }
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
                    editPlaceholder={'Input Site Name'}
                />
            </List>
            <Button fullWidth label={'SAVE'} onClick={handleSubmit} loading={loading} />
            {errorMessage ? <Typography color='error' align='center'> {errorMessage} </Typography> : null}
        </BaseScreen>
    );
}

export default EditSiteInformation;