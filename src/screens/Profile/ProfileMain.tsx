import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { logoutUser } from '../../lib/airlock/airlock';
import { useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

function ProfileMain() {
  const intl = useInternationalization(); 
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
    <BaseScreen title={intl(words.profile)} leftIcon="backNav">
      <List>
        <ListItemWrapper linkTo='/profile/user' leftText={intl(words.my_information)} divider />
        <ListItemWrapper linkTo='/profile/site' leftText={intl(words.site_information)} divider />
        <ListItem button onClick={handleLogoutClick} disableGutters >
          <ListItemText primary={intl(words.log_out)} primaryTypographyProps={{ color: 'primary' }} />
        </ListItem>
      </List>
    </BaseScreen>
  );
}

export default ProfileMain;
