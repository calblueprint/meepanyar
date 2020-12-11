import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '10px',
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: '6px',
    },
    content: {
      padding: '8px 12px',
      display: 'flex',
      flexDirection: 'column',
    },
    itemWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    items: {
      width: '100px',
      color: theme.palette.text.primary,
      margin: '5px',
    },
  }),
);

interface CardProps {
  info: {
    number: number;
    label: string;
    unit: string;
  }[];
  primary: boolean;
  rightIcon?: JSX.Element;
}

export default function OutlinedCardList(props: CardProps) {
  const classes = useStyles();

  const getLabeledNumber = (
    key: number,
    number: number,
    label: string,
    unit: string,
    primary: boolean,
    rightIcon: JSX.Element | null,
  ) => {
    return (
      <div key={key} className={classes.itemWrapper}>
        <div className={classes.items}>
          <Typography variant="body1">{label}</Typography>
          <Typography variant="h3" color={primary ? 'primary' : 'inherit'}>
            {number} {unit}
          </Typography>
        </div>
        {rightIcon}
      </div>
    );
  };

  const rightIcon = props.rightIcon ? props.rightIcon : null;
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {props.info.map((info, index) =>
          getLabeledNumber(index, info.number, info.label, info.unit, props.primary, rightIcon),
        )}
      </div>
    </div>
  );
}
