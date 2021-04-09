import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export interface CardPropsInfo {
  number: string;
  label: string;
  unit: string;
}

interface CardProps {
  info: CardPropsInfo[];
  primary: boolean;
  rightIcon?: JSX.Element;
  columns?: boolean;
  grayBackground?: boolean;
  grayText?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: CardProps) => ({
      marginTop: '10px',
      border: '1px solid',
      borderColor: props.grayBackground ? '#F7F9FC' : theme.palette.divider,
      borderRadius: '6px',
      backgroundColor: props.grayBackground ? '#F7F9FC' : 'white'
    }),
    content: (props: CardProps) => ({
      flex: 1,
      padding: '8px 8px',
      display: 'flex',
      flexDirection: props.columns ? 'row' : 'column'
    }),
    itemWrapper: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    items: (props: CardProps) => ({
      flex: 1,
      flexDirection: props.columns ? 'column-reverse' : 'column',
      display: 'flex',
      color: theme.palette.text.primary,
      margin: '5px',
    }),
    fullItems: {
      width: '100%',
      color: theme.palette.text.primary,
      margin: '5px',
    },
    red: {
      color: theme.palette.info.main,
    },
    text: (props: CardProps) => ({
      color: props.grayText ? 'rgba(189,189,189,1)' : theme.palette.text.primary,
    }),
  }),
);


export default function OutlinedCardList(props: CardProps): JSX.Element {
  const classes = useStyles(props);

  const getLabeledNumber = (
    key: number,
    number: string,
    label: string,
    unit: string,
    primary: boolean,
    rightIcon: JSX.Element | null,
    columns: boolean,
  ) => {
    return (
      <div key={key} className={ classes.itemWrapper }>
        <div className={rightIcon ? classes.items : classes.fullItems}>
          <Typography variant="body1" align={columns ? 'center' : 'inherit'}>{label}</Typography>
          <Typography variant="h3" align={columns ? 'center' : 'inherit'} className={primary ? classes.red : classes.text}>
            {number} {props.columns ? '' : unit}
          </Typography>
          {/* Split unit to new line if in column layout */}
          {props.columns &&
            <Typography variant="h3" align={columns ? 'center' : 'inherit'} color={primary ? 'primary' : 'inherit'}>
              {unit}
            </Typography>
          }
        </div>
        {rightIcon}
      </div>
    );
  };

  const rightIcon = props.rightIcon || null;
  const columns = props.columns || false;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {props.info.map((info, index) =>
          getLabeledNumber(index, info.number, info.label, info.unit, props.primary, rightIcon, columns),
        )}
      </div>
    </div>
  );
}

OutlinedCardList.defaultProps = {
  rightIcon: null,
  columns: false,
};
