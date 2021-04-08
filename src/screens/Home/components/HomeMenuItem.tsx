import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CheckIcon from '@material-ui/icons/Check';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BuildIcon from '@material-ui/icons/Build';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

type sublabel = {
  label: string;
  amount: number;
};

interface HomeMenuItemProps {
  label: string;
  amount?: number;
  sublabels?: sublabel[];
  noBadge?: boolean;
  iconType?: string;
  classes: { root: string; content: string; noAlert: string; sublabel: string; icon: string; checked: string; label: string; innerContent: string; };
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      borderRadius: '6px',
      padding: '15px 15px',
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
    sublabel: {
      color: '#BDBDBD',
    },
    icon: {
      width: '20px',
      height: '20px',
      color: theme.palette.common.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: '#FF6142',
    },
    checked: {
      backgroundColor: theme.palette.primary.main,
    },
    label: {
      marginLeft: '15px',
      color: '#757575',
      size: '14px',
    },
    innerContent: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });

function HomeMenuItem(props: HomeMenuItemProps) {
  const { label, sublabels, noBadge, classes, iconType } = props;
  const amount = props.amount
    ? sublabels
      ? sublabels.reduce(function (amt: number, curr: sublabel) {
        return amt + curr.amount;
      }, 0)
      : props.amount
    : null;

  const renderIcons = () => {
    if (iconType == 'meter' || iconType == 'collect') {
      return (
        <AccountBoxIcon color="primary" />
      );
    }
    if (iconType == 'maintain') {
      return (
        <BuildIcon color="primary" />
      );
    }
    if (iconType == 'incident') {
      return (
        <WarningIcon color="primary" />
      );
    }
  }

  return (
    <ButtonBase className={classes.root}>
      <div className={`${classes.content} ${noBadge ? null : amount}`}>
        <div className={classes.innerContent}>
          {renderIcons()}
          <div >
            <Typography className={classes.label}>{label}</Typography>
            {sublabels
              ? sublabels.map((sl: sublabel, index: number) => (
                <Typography className={classes.sublabel} variant="body1" key={index}>
                  {sl.amount} {sl.label}
                </Typography>
              ))
              : null}
          </div>
        </div>
        {noBadge ? null : (
          <div className={`${classes.icon} ${amount ? null : classes.checked}`}>
            {amount ? <Typography variant="body2">{amount}</Typography> : <CheckIcon fontSize="small" />}
          </div>
        )}
      </div>
    </ButtonBase >
  );
}

export default withStyles(styles)(HomeMenuItem);
