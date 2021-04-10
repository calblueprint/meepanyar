import { Link } from 'react-router-dom'
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, makeStyles } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface ListItemWrapperProps {
  leftText: string;
  rightText?: string
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
      textAlign: 'right',
      color: theme.palette.text.disabled
    }
  }));

const ListItemWrapper = (props: ListItemWrapperProps) => {
  const { linkTo, leftText, rightText, ...listItemProps } = props;
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
    primary={rightText}
  />)

  return (
    <ListItem disableGutters component={linkTo ? Link : 'li'} to={linkTo} {...listItemProps} >
      <ListItemText
        primary={leftText}
        primaryTypographyProps={{ color: 'textPrimary' }}
      />
      {rightText ? getRightText() : null}
      {linkTo ? getForwardIcon() : null}
    </ListItem>)
}

ListItemWrapper.defaultProps = {
  listItemProps: {}
}

export default ListItemWrapper