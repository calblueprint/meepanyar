import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { logoutUser } from '../../lib/airlock/airlock';
import { useHistory, Link } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ProfileCard from './components/ProfileCard';

function ProfileMain() {
  const history = useHistory();

  const handleLogoutClick = () => {
    logoutUser()
      .then((logoutSuccess: boolean) => {
        if (!logoutSuccess) {
          console.warn('Logout failed to reach backend, Client-side data cleared and redirecting to login');
        }
        history.push('/login');
      })
  };

  return (
    <BaseScreen title="Profile" leftIcon="backNav">
      <Link to={'/profile/user'} >
        <ProfileCard leftText={"My Information"} chevron />
      </Link>
      <ProfileCard leftText={"Site Information"} chevron />
      <Button variant='text' onClick={handleLogoutClick}>
        <Typography color='primary'>
          Log Out
        </Typography>
      </Button>
    </BaseScreen>
  );
}

export default ProfileMain;
