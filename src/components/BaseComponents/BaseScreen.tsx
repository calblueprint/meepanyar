import { createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import BaseHeader, { HeaderProps } from './BaseHeader';

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
  const { classes, leftIcon, title, rightIcon, match, backAction, searchAction, searchExit, searchPlaceholder, bigTitle } = props;

  return (
    <>
      <BaseHeader
        leftIcon={leftIcon}
        title={title}
        rightIcon={rightIcon}
        match={match}
        backAction={backAction}
        searchAction={searchAction}
        searchExit={searchExit}
        searchPlaceholder={searchPlaceholder}
        bigTitle={bigTitle}
      />
      <div className={classes.content}>{props.children}</div>
    </>
  );
};

export default withStyles(styles)(BaseScreen);
