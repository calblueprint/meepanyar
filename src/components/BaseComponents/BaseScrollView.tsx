import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    scroll: {
      overflow: 'scroll',
      height: '100%',
      width: '100%',
      paddingBottom: '15px',
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
