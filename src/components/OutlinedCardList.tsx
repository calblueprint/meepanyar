import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

interface CardProps {
  info: {
    number: number;
    label: string;
    unit: string;
  }[];
  primary: boolean;
  rightIcon?: JSX.Element;
  columns?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '10px',
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: '6px',
    },
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
  }),
);

function OutlinedCardList(props: CardProps): JSX.Element {
  const classes = useStyles(props);

  const getLabeledNumber = (
    key: number,
    number: number,
    label: string,
    unit: string,
    primary: boolean,
    rightIcon: JSX.Element | null,
    columns: boolean,
  ) => {
    return (
      <div key={key} className={ classes.itemWrapper }>
        <div className={classes.items}>
          <Typography variant="body1" align={columns ? 'center' : 'inherit'}>{label}</Typography>
          <Typography variant="h3" align={columns ? 'center' : 'inherit'} color={primary ? 'primary' : 'inherit'}>
            {number} {unit}
          </Typography>
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

export default OutlinedCardList;