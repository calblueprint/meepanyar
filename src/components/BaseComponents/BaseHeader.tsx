import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    emptySpace: {
      width: '40px',
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
  const { classes, match } = props;
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

  const icons: { [key: string]: JSX.Element } = {
    menu: getIcon(history.goBack, <MenuIcon />), //replace history.goBack with correct functions
    backNav: getIcon(history.goBack, <ArrowBackIosIcon />),
    edit: getIcon(navigateToEdit, <CreateIcon />),
    user: getIcon(history.goBack, <AccountCircleIcon />),
  };

  return (
    <div className={classes.root}>
      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar>
          {props.leftIcon ? icons[props.leftIcon] : null}
          {props.title ? (
            <Typography className={classes.title} variant="h2">
              {props.title}
            </Typography>
          ) : null}
          {props.rightIcon ? icons[props.rightIcon] : <div className={classes.emptySpace} />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(BaseHeader);
