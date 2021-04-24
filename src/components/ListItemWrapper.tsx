import { useHistory } from 'react-router-dom'
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, makeStyles, InputBase, InputAdornment, FormHelperText } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface ListItemWrapperProps {
  leftText: string;
  rightText?: string;
  linkTo?: string;
  editable?: boolean;
  onEditChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  editUnit?: string;
  editType?: string;
  editInputId?: string;
  editValue?: string;
  editPlaceholder?: string;
  error?: boolean;
  helperText?: string | false;
  dense?: boolean;
  divider?: boolean;
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    iconStyles: {
      paddingRight: 0
    },
    rightTextStyles: {
      color: theme.palette.text.disabled
    },
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
    error,
    helperText,
    editPlaceholder,
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
    primaryTypographyProps={{ align: 'right' }}
    primary={editable ?
      <div>
        <InputBase
          id={editInputId}
          value={editValue}
          onChange={onEditChange}
          classes={{ input: classes.inputStyles }}
          endAdornment={editUnit ? <InputAdornment position="end">{`${editUnit}`}</InputAdornment> : null}
          type={editType ? editType : 'text'}
          error={error}
          placeholder={editPlaceholder}
        />
        <FormHelperText error> {error && helperText} </FormHelperText>
      </div>
      : rightText}
  />)

  return (
    // Need to case as any here because of https://github.com/mui-org/material-ui/issues/14971
    <ListItem disableGutters button={(linkTo !== undefined) as any} onClick={navigateToLink} {...listItemProps} >
      <ListItemText
        primary={leftText}
        primaryTypographyProps={{ color: 'textPrimary', variant: 'body1' }}
      />
      {rightText || editable ? getRightText() : null}
      {linkTo ? getForwardIcon() : null}
    </ListItem>)
}

export default ListItemWrapper