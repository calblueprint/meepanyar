import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

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
  return (
    <div className={classes.loadingComponent}>
      <h1> Loading ... </h1>
    </div>
  );
};

export default withStyles(styles)(LoadingComponent);
