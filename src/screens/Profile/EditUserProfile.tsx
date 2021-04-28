import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { selectCurrentUser } from '../../lib/redux/userData';
import ListItemWrapper from '../../components/ListItemWrapper';
import { List } from '@material-ui/core';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

function UserProfile() {
  const intl = useInternationalization(); 
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Redirect to={'/home'} />
  }

  return (
    <BaseScreen title={intl(words.my_information)} leftIcon="backNav">
      <List>
        <ListItemWrapper leftText={intl(words.name)} rightText={user.name} dense />
        <ListItemWrapper leftText={intl(words.email)} rightText={user.email} dense />
        <ListItemWrapper leftText={`${intl(words.admin)}?`} rightText={user.admin ? intl(words.yes) : intl(words.no)} dense />
      </List>
    </BaseScreen>
  );
}

export default UserProfile;
