import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    scroll: {
      overflow: 'scroll',
      width: '100%',
      paddingBottom: 100,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  });

interface ScrollViewProps {
  classes: { scroll: string };
}

const ScrollView: React.FC<ScrollViewProps> = (props) => {
  const { classes } = props;

  return <div className={classes.scroll}>{props.children}</div>;
};

export default withStyles(styles)(ScrollView);
