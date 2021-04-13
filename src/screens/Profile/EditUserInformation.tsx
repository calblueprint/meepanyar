import { List, ListItem, ListItemSecondaryAction, ListItemText, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { RouteComponentProps } from 'react-router';
import { UserRecord } from '../../lib/airtable/interface';
import Button from '../../components/Button';

type EditTarifPlanInformationProps = RouteComponentProps<{}, {}, { user: UserRecord }>;

function EditUserInformation(props: EditTarifPlanInformationProps) {
    const { user } = props.location.state;

    const [newIsAdmin, setNewIsAdmin] = useState(user.admin || false);

    // TODO: Need to create this "Active" column for Users

    const handleSubmit = () => {
        console.log('New is Admin status: ', newIsAdmin);
    }

    return (
        <BaseScreen title={user.name} leftIcon="backNav">
            <List>
                <ListItem disableGutters>
                    <ListItemText
                        primary='Admin Permission'
                        primaryTypographyProps={{ color: 'textPrimary', variant: 'body1' }}
                    />
                    <ListItemSecondaryAction>
                        <Switch color='primary' edge='end' id='edit-active-status' checked={newIsAdmin} onChange={() => setNewIsAdmin(!newIsAdmin)} />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            <Button fullWidth label={'SAVE'} onClick={handleSubmit} />
        </BaseScreen>
    );
}

export default EditUserInformation;