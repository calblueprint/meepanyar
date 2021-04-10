import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { CardPropsInfo } from '../../../components/OutlinedCardList';
import IconButton from '@material-ui/core/IconButton';
import { Create as CreateIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '50%',
      display: 'flex',
    },
    info: (props: MeterInfoContainerProps) => ({
      width: '100%',
      marginBottom: '8px',
      padding: '0px 12px 4px',
      border: '1px solid',
      height: '60px',
      maxHeight: '60px',
      borderRadius: '6px',
      marginRight: props.floatRight ? undefined : '4px',
      marginLeft: props.floatRight ? '4px' : undefined,
      borderColor: props.grayBackground ?  theme.palette.background.default : theme.palette.text.disabled,
      backgroundColor: props.grayBackground ? theme.palette.background.default : 'white',
    }),
    icon: {
      fontSize: '14px',
      marginLeft: '5px',
      marginTop: '-4px',
      color: theme.palette.primary.main,
    },
    inline: {
      display: 'inline-flex',
    },
    text: (props: MeterInfoContainerProps) => ({
      color: props.grayText ? theme.palette.text.disabled : 'inherit',
    })
  }),
);

interface MeterInfoContainerProps {
  floatRight: boolean;
  info: CardPropsInfo;
  grayBackground?: boolean;
  grayText?: boolean;
}

export default function MeterInfoContainer(props: MeterInfoContainerProps): JSX.Element {
  const classes = useStyles(props);
  const { floatRight, info, grayBackground, grayText } = props;

  const getEditableIcon = () => (
    <IconButton size="small">
      {/* TODO: add link to this button */}
      <CreateIcon className={classes.icon} />
    </IconButton>
  );

  return (
    <div className={classes.root} style={{ float: floatRight ? 'right' : 'left' }}>
        <div className={classes.info}>
          <div className={classes.inline}>
            <Typography variant="body1">{info.label}</Typography>
            { grayBackground ? null : getEditableIcon()}
          </div>
          <Typography variant="h3" className={ grayText ? classes.text : undefined }>
            {info.number} {info.unit}
          </Typography>
       </div>
    </div>
  );
}
