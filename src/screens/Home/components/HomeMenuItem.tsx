import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BuildIcon from '@material-ui/icons/Build';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';


type sublabel = {
  label: string;
  amount: number;
};

interface HomeMenuItemProps {
  label: string;
  amount: number;
  sublabels?: sublabel[];
  noBadge?: boolean;
  iconType?: string;
  classes: { root: string; content: string; noAlert: string; badgeStyles: string; checked: string; innerContent: string; };
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      borderRadius: '6px',
      padding: 15,
      marginBottom: '12px',
    },
    content: {
      display: 'flex',
      width: 'inherit',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'left',
      color: '#6A6A6A',
    },
    noAlert: {
      opacity: '50%',
    },
    badgeStyles: {
      height: 24,
      width: 24,
      color: theme.palette.common.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: theme.palette.error.main,
    },
    checked: {
      backgroundColor: theme.palette.primary.main,
    },
    innerContent: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });

function HomeMenuItem(props: HomeMenuItemProps) {
  const { label, noBadge, classes, iconType, amount } = props;
  const renderIcons = () => {
    if (iconType === 'meter' || iconType === 'collect') {
      return (
        <AccountBoxIcon fontSize='large' color="primary" />
      );
    }
    if (iconType === 'maintenance') {
      return (
        <BuildIcon fontSize='large' color="primary" />
      );
    }
    if (iconType === 'incident') {
      return (
        <WarningIcon fontSize='large' color="primary" />
      );
    }
  }

  const getRightBadge = () => {
    if (amount === 0) {
      return <CheckCircleIcon color="primary" />
    }

    // We cap at 99 so the circle spacing doesn't break
    return <div className={classes.badgeStyles}>
      <Typography variant="body2">{amount > 99 ? '99+' : amount}</Typography>
    </div>
  }

  return (
    <ButtonBase className={classes.root}>
      <div className={classes.content}>
        <div className={classes.innerContent}>
          {renderIcons()}
          <Typography color='secondary' style={{ marginLeft: 15 }}>{label}</Typography>
        </div>
        {getRightBadge()}
      </div>
    </ButtonBase >
  );
}

export default withStyles(styles)(HomeMenuItem);
