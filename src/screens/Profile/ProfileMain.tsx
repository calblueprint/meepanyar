import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { logoutUser } from '../../lib/airlock/airlock';
import { useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';

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
      <List>
        <ListItemWrapper linkTo='/profile/user' leftText='My Information' divider />
        <ListItemWrapper linkTo='/profile/site' leftText='Site Information' divider />
        <ListItem button onClick={handleLogoutClick} disableGutters >
          <ListItemText primary='Log Out' primaryTypographyProps={{ color: 'primary' }} />
        </ListItem>
      </List>
    </BaseScreen>
  );
}

export default ProfileMain;