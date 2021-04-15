import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import React from 'react';

export interface CardPropsInfo {
  number: string;
  label: string;
  unit: string;
  secondaryLabel?: string; // Label shown on the top right of OutlinedCardList
}

interface CardProps {
  info: CardPropsInfo[];
  highlighted?: boolean;
  rightIcon?: JSX.Element;
  columns?: boolean;
  readOnly?: boolean;
  editPath?: string;
  reverse?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: CardProps) => ({
      marginTop: '10px',
      border: '1px solid',
      borderColor: props.readOnly ? theme.palette.background.default : theme.palette.text.disabled,
      borderRadius: '6px',
      backgroundColor: props.readOnly ? theme.palette.background.default : 'white'
    }),
    content: (props: CardProps) => ({
      flex: 1,
      padding: '8px 8px',
      display: 'flex',
      flexDirection: props.columns ? 'row' : 'column',
    }),
    itemWrapper: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '5px',
    },
    items: (props: CardProps) => ({
      flex: 1,
      flexDirection: props.columns ? 'column-reverse' : 'column',
      display: 'flex',
    }),
    fullItems: {
      width: '100%',
      color: theme.palette.text.primary,
    },
    reverseLabel: {
      wordSpacing: '100vw',
      lineHeight: '1.2',
    },
    editButton: {
      float: 'right',
    },
    editIcon: {
      color: theme.palette.primary.main,
      fontSize: '14px',
      marginLeft: '5px',
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    }
  }),
);

export default function OutlinedCardList(props: CardProps): JSX.Element {
  const classes = useStyles(props);

  const getEditButton = (pathname: string) => {
    return (
      <IconButton
        component={Link}
        to={{ pathname }}
        size="small"
        className={classes.editButton}
      >
        <CreateIcon className={classes.editIcon} />
      </IconButton>
    );
  }

  const getLabeledNumber = (
    key: number,
    number: string,
    label: string,
    unit: string,
    secondaryLabel?: string,
  ) => {
    const { columns, rightIcon, editPath, highlighted } = props;
    const getFormattedLabel = () => (
      <div className={classes.headerContainer}>
        <div>
          {editPath ? getEditButton(editPath) : null}
          <Typography align={columns ? 'center' : 'inherit'} className={props.reverse ? classes.reverseLabel : undefined}>{label}</Typography>
        </div>
        {secondaryLabel && <Typography align='right' color='secondary'> {secondaryLabel} </Typography> }
      </div>
    );
    const getFormattedNumber = () => (
      <Typography variant="h3" align={columns ? 'center' : 'inherit'} color={highlighted ? 'error' : 'inherit'}>
        {number} {unit}
      </Typography>
    );
    return (
      <div key={key} className={classes.itemWrapper}>
        <div className={rightIcon ? classes.items : classes.fullItems}>
          {props.reverse ? getFormattedNumber() : getFormattedLabel()}
          {props.reverse ? getFormattedLabel() : getFormattedNumber()}
          {/* Split unit to new line if in column layout */}
          {!props.reverse && columns &&
            <Typography variant="h3" align={columns ? 'center' : 'inherit'} color={highlighted ? 'primary' : 'inherit'}>
              {unit}
            </Typography>
          }
        </div>
        {rightIcon}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {props.info.map((info, index) =>
          getLabeledNumber(index, info.number, info.label, info.unit, info.secondaryLabel),
        )}
      </div>
    </div>
  );
}

OutlinedCardList.defaultProps = {
  rightIcon: null,
  columns: false,
  highlighted: false,
};
