import React from 'react';
import BaseHeader, { HeaderProps } from './BaseHeader';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    content: {
      top: '85px',
      bottom: '56px',
      width: '100%',
      height: 'auto',
      position: 'absolute',
      padding: '0 25px',
    },
  });

interface BaseScreenProps extends HeaderProps {
  classes: { content: string };
}

const BaseScreen: React.FC<BaseScreenProps> = (props) => {
  const { classes, leftIcon, title, rightIcon, match, editAction } = props;

  return (
    <>
      <BaseHeader editAction={editAction} leftIcon={leftIcon} title={title} rightIcon={rightIcon} match={match} />
      <div className={classes.content}>{props.children}</div>
    </>
  );
};

export default withStyles(styles)(BaseScreen);
