import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { selectCurrentUser } from '../../lib/redux/userData';
import ProfileCard from './components/ProfileCard';

function UserProfile() {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Redirect to={'/home'} />
  }

  return (
    <BaseScreen title="My Information" leftIcon="backNav">
      <ProfileCard leftText={'Name'} rightText={user?.fields.Name} noBottomBorder />
      <ProfileCard leftText={'Email'} rightText={user?.fields.Email} noBottomBorder />
      <ProfileCard leftText={'Admin?'} rightText={user?.fields.Admin ? 'Yes' : 'No'} noBottomBorder />
    </BaseScreen>
  );
}

export default UserProfile;
