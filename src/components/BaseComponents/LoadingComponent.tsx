import React, { useEffect } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const styles = () =>
  createStyles({
    loadingComponent: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  });

interface LoadingComponentProps {
  classes: { loadingComponent: string };

}

const LoadingComponent = (props: LoadingComponentProps) => {
  const { classes } = props;
  const history = useHistory();

  // If a user is stuck on the loading screen for more than 15 seconds, we send them back to the login screen
  useEffect(() => {
    const timeoutId = setTimeout(() => history.push('/login'), 15000)
    return () => {
      clearTimeout(timeoutId)
      console.log("Timeout cleared")
    }
  })

  return (
    <div className={classes.loadingComponent}>
      <h1> Loading ... </h1>
    </div>
  );
};

export default withStyles(styles)(LoadingComponent);
