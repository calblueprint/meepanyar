import { createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = () =>
  createStyles({
    scroll: {
      overflow: 'scroll',
      height: '100%',
      width: '100%',
      paddingBottom: 56, // height of bottom nav bar
    },
  });

interface BaseScrollViewProps {
  classes: { scroll: string };
}

const BaseScrollView: React.FC<BaseScrollViewProps> = (props) => {
  const { classes } = props;

  return <div className={classes.scroll}>{props.children}</div>;
};

export default withStyles(styles)(BaseScrollView);
