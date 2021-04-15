import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../lib/airlock/airlock';
import { selectCurrentUser } from '../../lib/redux/userData';
import SearchBar from '../../components/SearchBar';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: HeaderProps) => ({
      display: 'flex',
      alignItems: 'center',
      height: '85px',
      textAlign: 'center',
      marginTop: '20px',
    }),
    title: {
      flexGrow: 1,
    },
    leftTitle: {
      float: 'left',
      padding: '0px 25px',
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
  }),
);

export interface HeaderProps {
  leftIcon?: string;
  title?: string;
  rightIcon?: string;
  match?: any;
  backAction?: () => void;
  searchAction?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchExit?: () => void;
}

export default function BaseHeader(props: HeaderProps): JSX.Element {
  const { leftIcon, title, rightIcon, match, backAction, searchAction, searchExit } = props;
  const classes = useStyles(props);

  const [searchVisible, setSearchVisible] = useState(false);
  const history = useHistory();
  const backActionDefault = history.goBack;

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
    user: getIcon(navigateToProfile, <AccountCircleIcon className={classes.account} fontSize="large" />),
  };

  const left = leftIcon ? icons[leftIcon] : null;
  const header = title ? (
    <Typography className={searchAction ? classes.leftTitle : classes.title} variant={searchAction ? 'h1' : 'h2'}>
      {title}
    </Typography>
  ) : null;
  const right = rightIcon ? icons[rightIcon] : null;

  const onSearchExit = () => {
    setSearchVisible(false);
    if (searchExit != undefined) {
      searchExit();
    }
  }

  const getSearchBar = () => (
    <div className={classes.searchBar} style={{display: searchVisible ? 'block' : 'none' }}>
      {/* typecasted searchAction to any because of type problems */}
      <SearchBar placeholder="Search for a customer" onSearchChange={searchAction as any} onSearchExit={onSearchExit} autoFocus />
    </div>
  );

  return (
    <div className={classes.root}>
      {header}
      <div className={classes.toolbar}>
        <div className={classes.left}>{left}</div>
        <div className={classes.right}>
          {searchAction && getIcon(() => setSearchVisible(true), <SearchIcon />)}
          {right}
        </div>
      </div>
      {searchAction && getSearchBar()}
    </div>
  );
}
