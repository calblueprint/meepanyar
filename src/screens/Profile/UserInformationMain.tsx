
import React from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { useSelector } from 'react-redux';
import { selectAllSiteUsersArray, selectCurrentUserId } from '../../lib/redux/userData';
import UserCard from './components/UserCard';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

function UserInformationMain() {
    const intl = useInternationalization(); 
    // Don't show current user
    const currentUserId = useSelector(selectCurrentUserId);
    const users = useSelector(selectAllSiteUsersArray).filter(user => user.id !== currentUserId);

    // TODO: Differentiate between active and inactive users (currently not a column on Airtable)
    return (
        <BaseScreen title={intl(words.user_information)} leftIcon="backNav">
            {users.map(user => <UserCard key={user.id} user={user} />)}
        </BaseScreen>
    );
}

export default UserInformationMain;