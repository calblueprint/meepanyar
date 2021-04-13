import { List, ListItem, ListItemSecondaryAction, ListItemText, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { RouteComponentProps, useHistory } from 'react-router';
import { UserRecord } from '../../lib/airtable/interface';
import Button from '../../components/Button';
import { updateUser } from '../../lib/airtable/request';
import { updateUserInRedux } from '../../lib/redux/userData';

type EditTarifPlanInformationProps = RouteComponentProps<{}, {}, { user: UserRecord }>;

function EditUserInformation(props: EditTarifPlanInformationProps) {
    const { user } = props.location.state;

    const history = useHistory();
    const [newIsAdmin, setNewIsAdmin] = useState(user.admin || false);
    const [loading, setLoading] = useState(false);

    // TODO: Need to create this "Active" column for Users

    const handleSubmit = async (event: React.MouseEvent) => {
        // Prevent page refresh on submit
        event.preventDefault();
        setLoading(true);

        try {
            await updateUser(user.id, { admin: newIsAdmin });
        } catch (error) {
            console.error("Error occurred while attempting to update user: ", error);
        } finally {
            // We naively update the user in redux and do proper authentication on the backend
            // to make sure only admins can successfully make other users admins
            updateUserInRedux({id: user.id, admin: newIsAdmin});
            history.goBack()
        }
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
            <Button fullWidth label={'SAVE'} onClick={handleSubmit} loading={loading} />
        </BaseScreen>
    );
}

export default EditUserInformation;