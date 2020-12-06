import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = () =>
  createStyles({
    button: {
      color: 'white',
      display: 'flex',
      borderRadius: '20px',
      width: '187px',
      height: '48px',
      marginTop: '10%',
      margin: '0 auto',
    },
  });

interface MainButtonProps {
  classes: { button: string };
  label: string;
}

function MainButton(props: MainButtonProps) {
  const { classes } = props;
  return (
    <Button className={classes.button} type="submit" variant="contained" color="primary" disableElevation={true}>
      {props.label}
    </Button>
  );
}

export default withStyles(styles)(MainButton);
