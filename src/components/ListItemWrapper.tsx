import { useHistory } from 'react-router-dom'
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, makeStyles, InputBase, InputAdornment } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface ListItemWrapperProps {
  leftText: string;
  rightText?: string;
  boldRightText?: boolean;
  linkTo?: string;
  editable?: boolean;
  onEditChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  editUnit?: string;
  editType?: string;
  editError?: boolean;
  editInputId?: string;
  editValue?: string;
  editPlaceholder?: string;
  dense?: boolean;
  divider?: boolean;
  smallLineHeight?: boolean;
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    content: (props: ListItemWrapperProps) => ({
      padding: props.smallLineHeight ? 0 : undefined,
      margin: props.smallLineHeight ? '-8px 0px' : undefined,
    }),
    iconStyles: {
      paddingRight: 0
    },
    rightTextStyles: (props: ListItemWrapperProps) => ({
      color: props.boldRightText ? theme.palette.text.primary : theme.palette.text.disabled,
    }),
    inputStyles: {
      textAlign: 'right',
      color: theme.palette.text.disabled
    }
  }));

const ListItemWrapper = (props: ListItemWrapperProps) => {
  const {
    linkTo,
    leftText,
    rightText,
    editable,
    editValue,
    onEditChange,
    editInputId,
    editUnit,
    editType,
    editError,
    editPlaceholder,
    boldRightText,
    smallLineHeight,
    ...listItemProps } = props;
  const classes = styles(props);

  const history = useHistory();

  const navigateToLink = () => {
    return linkTo ? history.push(linkTo) : null;
  };

  const getForwardIcon = () =>
  (<ListItemSecondaryAction>
    <IconButton edge="end" className={classes.iconStyles} onClick={navigateToLink}>
      <ArrowForwardIosIcon fontSize='small' />
    </IconButton>
  </ListItemSecondaryAction>)

  const getRightText = () =>
  (<ListItemText
    className={classes.rightTextStyles}
    primaryTypographyProps={{ align: 'right', variant: props.boldRightText ? "h4" : "body1" }}
    primary={editable ?
      <InputBase
        id={editInputId}
        value={editValue}
        onChange={onEditChange}
        classes={{ input: classes.inputStyles }}
        endAdornment={editUnit ? <InputAdornment position="end">{`${editUnit}`}</InputAdornment> : null }
        type={editType ? editType : 'text'}
        error={editError}
        placeholder={editPlaceholder}
      />
      : rightText}
  />)

  return (
    // Need to case as any here because of https://github.com/mui-org/material-ui/issues/14971
    <ListItem disableGutters button={(linkTo !== undefined) as any} onClick={navigateToLink} {...listItemProps} className={classes.content}>
      <ListItemText
        primary={leftText}
        primaryTypographyProps={{ color: 'textPrimary', variant: 'body1' }}
      />
      {rightText || editable ? getRightText() : null}
      {linkTo ? getForwardIcon() : null}
    </ListItem>)
}

export default ListItemWrapper
