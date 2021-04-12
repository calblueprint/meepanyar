import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../lib/airlock/airlock';
import { selectCurrentUser } from '../../lib/redux/userData';
import SearchBar from '../../components/SearchBar';
import { useSelector } from 'react-redux';

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
      color: theme.palette.primary.main,
      fontSize: '30px',
      padding: 0,
    },
    searchBar: {
      position: 'absolute',
      width: '100%',
      padding: '20px',
      backgroundColor: 'white',
    },
    leftTitle: {
      float: 'left',
      padding: '0px 25px',
      fontSize: '30px',
      color: theme.palette.text.primary,
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
  searchAction?: any;
  searchExit?: any;
}

function BaseHeader(props: HeaderProps) {
  const { leftIcon, title, rightIcon, classes, match, backAction, searchAction, searchExit } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const name = currentUser?.name || '';
  const email = currentUser?.email || '';

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
    user: getIcon(openProfileMenu, <MenuIcon className={classes.account} fontSize="large" />),
  };

  const left = leftIcon ? icons[leftIcon] : null;
  const header = title ? (
    <Typography className={searchAction ? classes.leftTitle : classes.title} variant="h2">
      {title}
    </Typography>
  ) : null;
  const right = rightIcon ? icons[rightIcon] : null;

  const onSearchExit = () => {
    setSearchVisibility(false);
    searchExit();
  }

  return (
    <div className={classes.root} style={{ marginTop: props.searchAction ? '20px' : undefined }}>
      {header}
      <div className={classes.toolbar}>
        <div className={classes.left}>{left}</div>
        <div className={classes.right}>
          {props.searchAction ? getIcon(() => setSearchVisibility(true), <SearchIcon className={classes.search} />) : null}
          {right}
        </div>
        {profileMenu}
      </div>
      <div className={classes.searchBar} style={{display: searchVisibility ? 'block' : 'none' }}>
        <SearchBar placeholder="Search for a customer" onSearchChange={searchAction} onSearchExit={onSearchExit} />
      </div>
    </div>
  );
}

export default withStyles(styles)(BaseHeader);
