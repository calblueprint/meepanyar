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
        <ListItemWrapper leftText={'Name'} rightText={user.name} dense />
        <ListItemWrapper leftText={'Email'} rightText={user.email} dense />
        <ListItemWrapper leftText={'Admin?'} rightText={user.admin ? 'Yes' : 'No'} dense />
      </List>
    </BaseScreen>
  );
}

export default UserProfile;
