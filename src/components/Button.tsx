import { Button } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';

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

  // TODO: @wangannie figure out how onclick would work in relation to linking to avoid confusion
interface MainButtonProps {
  classes: { button: string };
  label: string;
  onClick?: (event: React.MouseEvent) => void;
}

function MainButton(props: MainButtonProps) {
  const { classes } = props;
  return (
    <Button className={classes.button} type="submit" variant="contained" color="primary" disableElevation={true} onClick={props.onClick}>
      {props.label}
    </Button>
  );
}

export default withStyles(styles)(MainButton);
