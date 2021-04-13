
import React from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { useSelector } from 'react-redux';
import { selectAllSiteUsersArray } from '../../lib/redux/userData';
import UserCard from './components/UserCard';

function UserInformationMain() {
    const users = useSelector(selectAllSiteUsersArray);

    // TODO: Differentiate between active and inactive users (currently not a column on Airtable)
    return (
        <BaseScreen title="User Information" leftIcon="backNav">
            {users.map(user => <UserCard user={user} />)}
        </BaseScreen>
    );
}

export default UserInformationMain;