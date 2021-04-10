import { Link } from 'react-router-dom'
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, makeStyles } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface ListItemWrapperProps {
  leftPrimaryText: string;
  leftSecondaryText?: string;
  rightPrimaryText?: string;
  rightSecondaryText?: string;
  linkTo?: string;
  dense?: boolean;
  divider?: boolean;
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    iconStyles: {
      paddingRight: 0
    },
    rightTextStyles: {
      textAlign: 'right'
    }
  }));

const ListItemWrapper = (props: ListItemWrapperProps) => {
  const { linkTo, leftPrimaryText, leftSecondaryText, rightPrimaryText, rightSecondaryText, ...listItemProps } = props;
  const classes = styles(props);

  const getForwardIcon = () =>
  (<ListItemSecondaryAction>
    <IconButton edge="end" className={classes.iconStyles}>
      <ArrowForwardIosIcon fontSize='small' />
    </IconButton>
  </ListItemSecondaryAction>)

  const getRightText = () =>
  (<ListItemText
    className={classes.rightTextStyles}
    primary={rightPrimaryText}
    primaryTypographyProps={{ color: 'textPrimary' }}
    secondary={rightSecondaryText}
    secondaryTypographyProps={{ color: 'textSecondary' }}
  />)

  return (
    <ListItem disableGutters component={linkTo ? Link : 'li'} to={linkTo} {...listItemProps} >
      <ListItemText
        primary={leftPrimaryText}
        primaryTypographyProps={{ color: 'textPrimary' }}
        secondary={leftSecondaryText}
        secondaryTypographyProps={{ color: 'textSecondary' }}
      />
      {rightPrimaryText || rightSecondaryText ? getRightText() : null}
      {linkTo ? getForwardIcon() : null}
    </ListItem>)
}

ListItemWrapper.defaultProps = {
  listItemProps: {}
}

export default ListItemWrapper