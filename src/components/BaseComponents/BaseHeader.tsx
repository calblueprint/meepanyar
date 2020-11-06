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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '15px 0',
    },
    title: {
      flexGrow: 1,
      color: theme.palette.text.primary,
    },
  });

interface HeaderProps {
  leftIcon?: string;
  title?: string;
  rightIcon?: string;
  classes: any;
}

function BaseHeader(props: HeaderProps) {
  const { classes } = props;

  const icons: { [key: string]: JSX.Element } = {
    menu: <MenuIcon />,
    backNav: <ArrowBackIosIcon />,
    edit: <CreateIcon />,
    user: <AccountCircleIcon />,
  };

  return (
    <div className={classes.root}>
      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar>
          {props.leftIcon ? <IconButton color="primary"> {icons[props.leftIcon]} </IconButton> : null}
          {props.title ? (
            <Typography className={classes.title} variant="h2">
              {props.title}
            </Typography>
          ) : null}
          {props.rightIcon ? <IconButton color="primary"> {icons[props.rightIcon]} </IconButton> : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(BaseHeader);
