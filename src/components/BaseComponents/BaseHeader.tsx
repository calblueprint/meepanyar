import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '15px 0',
    },
    title: {
      flexGrow: 1,
      color: theme.palette.text.primary,
    },
  }),
);

interface HeaderProps {
  leftIcon?: string;
  title?: string;
  rightIcon?: string;
}

export default function BaseHeader(props: HeaderProps) {
  const getIconButton = (icon: string) => {
    let displayIcon;
    switch (icon) {
      case 'menu':
        displayIcon = <MenuIcon />;
        break;
      case 'backNav':
        displayIcon = <ArrowBackIosIcon />;
        break;
      case 'edit':
        displayIcon = <CreateIcon />;
        break;
      case 'user':
        displayIcon = <AccountCircleIcon />;
        break;
      default:
        displayIcon = null;
    }
    return <IconButton color="primary"> {displayIcon} </IconButton>;
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar>
          {props.leftIcon ? <>{getIconButton(props.leftIcon)}</> : null}
          {props.title ? (
            <Typography className={classes.title} variant="h2">
              {props.title}
            </Typography>
          ) : null}
          {props.rightIcon ? <>{getIconButton(props.rightIcon)}</> : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}