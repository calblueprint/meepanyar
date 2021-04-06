import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { CardPropsInfo } from '../../../components/OutlinedCardList';
import IconButton from '@material-ui/core/IconButton';
import { Create as CreateIcon } from '@material-ui/icons';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '50%',
      display: 'flex',
    },
    info: {
      width: '100%',
      marginBottom: '8px',
      padding: '4px 12px',
      border: '1px solid',
      height: '60px',
      maxHeight: '60px',
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.divider,
      borderRadius: '6px',
    },
    icon: {
      fontSize: '14px',
      marginLeft: '5px',
      marginTop: '-4px',
      color: theme.palette.primary.main,
    },
    inline: {
      display: 'inline-flex',
    },
  });

interface MeterInfoContainerProps {
  classes: { root: string; info: string; icon: string; inline: string; };
  floatRight: boolean;
  info: CardPropsInfo;
  editable?: boolean;
  gray?: boolean;
}

function MeterInfoContainer(props: MeterInfoContainerProps) {
  const { classes, floatRight, info, editable, gray } = props;

  if (editable) {
    return (
      <div className={classes.root} style={{ float: floatRight ? 'right' : 'left' }}>
        <div className={classes.info} style={{
          marginRight: floatRight ? undefined : '4px',
          marginLeft: floatRight ? '4px' : undefined,
          paddingTop: '0px',
          backgroundColor: 'white' }}
        >
          <div className={classes.inline}>
            <Typography variant="body1">{info.label}</Typography>
            <IconButton size="small">
              {/* TODO: add link to this button */}
              <CreateIcon className={classes.icon} />
            </IconButton>
          </div>
          <Typography variant="h3" style={{ color: gray ? 'rgba(189,189,189,1)' : undefined }}>
            {info.number} {info.unit}
          </Typography>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.root} style={{ float: floatRight ? 'right' : 'left' }}>
        <div className={classes.info} style={{
          marginRight: floatRight ? undefined : '4px',
          marginLeft: floatRight ? '4px' : undefined }}
        >
          <Typography variant="body1">{info.label}</Typography>
          <Typography variant="h3" style={{ color: gray ? 'rgba(189,189,189,1)' : undefined }}>
            {info.number} {info.unit}
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MeterInfoContainer);
