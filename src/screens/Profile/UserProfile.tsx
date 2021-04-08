import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { UserRecord } from '../../lib/airtable/interface';
import { selectCurrentUser } from '../../lib/redux/userData';
import ProfileCard from './components/ProfileCard';

const styles = (theme: Theme) =>
  createStyles({
  });

interface UserProfileProps extends RouteComponentProps {
  location: any;
}

function UserProfile(props: UserProfileProps) {
  const history = useHistory();
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Redirect to={'/home'} />
  }


  return (
    <BaseScreen title="Profile" leftIcon="backNav">
      <ProfileCard leftContent={'Name'} rightContent={user?.fields.Name}  noBottomBorder />
      <ProfileCard leftContent={'Email'} rightContent={user?.fields.Email} noBottomBorder />
      <ProfileCard leftContent={'Admin?'} rightContent={user?.fields.Admin ? 'Yes' : 'No'} noBottomBorder />
    </BaseScreen>
  );
}

export default withStyles(styles)(UserProfile);
