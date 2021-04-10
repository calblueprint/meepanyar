import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { selectCurrentUser } from '../../lib/redux/userData';
import ListItemWrapper from '../../components/ListItemWrapper';
import { List } from '@material-ui/core';

function UserProfile() {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Redirect to={'/home'} />
  }

  return (
    <BaseScreen title="My Information" leftIcon="backNav">
      <List>
        <ListItemWrapper leftPrimaryText={'Name'} rightSecondaryText={user?.fields.Name} dense />
        <ListItemWrapper leftPrimaryText={'Email'} rightSecondaryText={user?.fields.Email} dense />
        <ListItemWrapper leftPrimaryText={'Admin?'} rightSecondaryText={user?.fields.Admin ? 'Yes' : 'No'} dense />
      </List>
    </BaseScreen>
  );
}

export default UserProfile;
