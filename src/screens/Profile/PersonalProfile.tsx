import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { logoutUser } from '../../lib/airlock/airlock';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ProfileCard from './components/ProfileCard';

const styles = (theme: Theme) =>
  createStyles({
  });

interface PersonalProfileProps extends RouteComponentProps {
  location: any;
}

function PersonalProfile(props: PersonalProfileProps) {
  const history = useHistory();


  return (
    <BaseScreen title="Profile" leftIcon="backNav">
      <ProfileCard cardContent={"My Information"} />
      <ProfileCard cardContent={"Site Information"} />
      <Button variant='text'>
        <Typography color='primary'>
          Log Out
        </Typography>
      </Button>

    </BaseScreen>
  );
}

export default withStyles(styles)(PersonalProfile);
