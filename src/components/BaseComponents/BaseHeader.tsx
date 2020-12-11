import React from 'react';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
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
    grey: {
      color: theme.palette.divider,
    },
  });

export interface HeaderProps {
  leftIcon?: string;
  title?: string;
  rightIcon?: string;
  classes: any;
  match?: any;
}

function BaseHeader(props: HeaderProps) {
  const { leftIcon, title, rightIcon, classes, match } = props;
  const history = useHistory();

  const getIcon = (onClick: (event: React.MouseEvent) => void, icon: JSX.Element) => {
    return (
      <IconButton onClick={onClick} color="primary">
        {icon}
      </IconButton>
    );
  };

  const navigateToEdit = () => {
    history.push(`${match.url}/edit`);
  };

  //TODO: allow users to input icons rather than map strings to icons
  const icons: { [key: string]: JSX.Element } = {
    menu: getIcon(history.goBack, <MenuIcon />), //replace history.goBack with correct functions
    backNav: getIcon(history.goBack, <ArrowBackIosIcon />),
    edit: getIcon(navigateToEdit, <CreateIcon />),
    user: getIcon(history.goBack, <AccountCircleIcon className={classes.grey} />),
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
