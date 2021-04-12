import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      height: '85px',
      backgroundColor: 'white',
      textAlign: 'center',
    },
    title: {
      flexGrow: 1,
      color: theme.palette.text.primary,
    },
    toolbar: {
      position: 'absolute',
      width: '100%',
      padding: '0 10px',
    },
    left: {
      float: 'left',
    },
    right: {
      float: 'right',
    },
    account: {
      color: theme.palette.divider,
      fontSize: '30px',
      padding: 0,
    },
  });

export interface HeaderProps {
  leftIcon?: string;
  title?: string;
  rightIcon?: string;
  classes: any;
  match?: any;
  backAction?: () => void;
}

function BaseHeader(props: HeaderProps) {
  const { leftIcon, title, rightIcon, classes, match, backAction } = props;

  const history = useHistory();
  const backActionDefault = history.goBack;

  const getIcon = (onClick: (event: React.MouseEvent<HTMLElement>) => void, icon: JSX.Element, primary?: boolean) => {
    return (
      <IconButton onClick={onClick} color={primary? "primary" : "default"}>
        {icon}
      </IconButton>
    );
  };

  const navigateToProfile = () => {
    history.push('/profile')
  };

  const navigateToEdit = () => {
    history.push(`${match.url}/edit`);
  };

  //TODO: allow users to input icons rather than map strings to icons
  const icons: { [key: string]: JSX.Element } = {
    backNav: getIcon(backAction || backActionDefault, <ArrowBackIcon />),
    edit: getIcon(navigateToEdit, <CreateIcon />),
    user: getIcon(navigateToProfile, <AccountCircleIcon className={classes.account} fontSize="large" />),
  };

  const left = leftIcon ? icons[leftIcon] : null;
  const header = title ? (
    <Typography className={classes.title} variant="h2">
      {title}
    </Typography>
  ) : null;
  const right = rightIcon ? icons[rightIcon] : null;

  return (
    <div className={classes.root}>
      {header}
      <div className={classes.toolbar}>
        <div className={classes.left}>{left}</div>
        <div className={classes.right}>{right}</div>
      </div>
    </div>
  );
}

export default withStyles(styles)(BaseHeader);
