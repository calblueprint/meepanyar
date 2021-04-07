import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CreateIcon from '@material-ui/icons/Create';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

  const history = useHistory();
  const backActionDefault = history.goBack;

  const getIcon = (onClick: (event: React.MouseEvent<HTMLElement>) => void, icon: JSX.Element) => {
    return (
      <IconButton onClick={onClick} color="primary">
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
    backNav: getIcon(backAction || backActionDefault, <ArrowBackIosIcon />),
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

const mapStateToProps = (state: RootState) => ({
  name: state.userData.user?.fields.Name || '',
  email: state.userData.user?.fields.Email || '',
});

export default connect(mapStateToProps)(withStyles(styles)(BaseHeader));
