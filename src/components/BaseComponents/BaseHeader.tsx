import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../lib/airlock/airlock';
import { RootState } from '../../lib/redux/store';
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
  name?: string;
  email?: string;
  backAction?: () => void;
}

function BaseHeader(props: HeaderProps) {
  const { leftIcon, title, rightIcon, classes, match, name, email, backAction } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const history = useHistory();
  const backActionDefault = history.goBack;
  const handleLogoutClick = async () => {
    const logoutSuccess = await logoutUser();
    if (logoutSuccess){
      history.push('/login');
    } else {
      console.warn('Logout failed');
    }
  };

  const getIcon = (onClick: (event: React.MouseEvent<HTMLElement>) => void, icon: JSX.Element, primary?: boolean) => {
    return (
      <IconButton onClick={onClick} color={primary? "primary" : "default"}>
        {icon}
      </IconButton>
    );
  };


  const openProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const closeProfileMenu = () => {
    setAnchorEl(null);
  };

  const profileMenu = (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeProfileMenu}>
      <MenuItem>{name}</MenuItem>
      <MenuItem>{email}</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  );

  const navigateToEdit = () => {
    history.push(`${match.url}/edit`);
  };

  //TODO: allow users to input icons rather than map strings to icons
  const icons: { [key: string]: JSX.Element } = {
    backNav: getIcon(backAction || backActionDefault, <ArrowBackIcon />),
    edit: getIcon(navigateToEdit, <CreateIcon />, true),
    user: getIcon(openProfileMenu, <AccountCircleIcon className={classes.account} fontSize="large" />),
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
        {profileMenu}
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  name: state.userData.user?.fields.Name || '',
  email: state.userData.user?.fields.Email || '',
});

export default connect(mapStateToProps)(withStyles(styles)(BaseHeader));
