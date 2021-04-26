import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BuildIcon from '@material-ui/icons/Build';
import WarningIcon from '@material-ui/icons/Warning';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';


type sublabel = {
  label: string;
  amount: number;
};

interface HomeMenuItemProps {
  label: string;
  amount: number;
  sublabels?: sublabel[];
  iconType?: string;
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      borderRadius: '6px',
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    content: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
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
    leftContent: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  }));

// This component could also be done using `Card`, `CardContent` and `CardActions`.
// Might be cleaner in the future, but since the component is lean right now refactor isn't necessary
function HomeMenuItem(props: HomeMenuItemProps) {
  const { label, iconType, amount } = props;
  const classes = styles(props);
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
        <div className={classes.leftContent}>
          {renderIcons()}
          <Typography color='secondary' style={{ marginLeft: 15 }}>{label}</Typography>
        </div>
        {getRightBadge()}
      </div>
    </ButtonBase >
  );
}

export default HomeMenuItem;
