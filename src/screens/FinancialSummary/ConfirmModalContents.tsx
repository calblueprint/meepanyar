import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextWrapper from '../../components/TextWrapper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
      },
      cancelButton: {
        borderRadius: '18px',
        borderWidth: '2px',
        borderColor: theme.palette.grey[300],
        letterSpacing: '0.14em',
        height: '41px',
      },
      confirmButton: {
        borderColor: theme.palette.primary.main,
        borderRadius: '18px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        letterSpacing: '0.14em',
        height: '41px',
      },
      confirmText: {
        margin: '24px 31px',
        textAlign: 'center',
        color: theme.palette.text.primary,
        lineHeight: '120.5%',
      },
    modalContents: {
        backgroundColor: theme.palette.common.white,
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: '15px',
        color: theme.palette.text.primary,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
        padding: '25px 19px',
      },
      valueWrappers: {
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: '6px',
        padding: '22px 22px',
      },
      invisibleDivider: {
        backgroundColor: theme.palette.common.white,
        margin: '4px 0',
      },
  }),
);

interface ConfirmModalContents {
  onClick: () => void;
  profitNumbers: number[];
}

export default function ConfirmModalContents(props: ConfirmModalContents) {
  const classes = useStyles();

  const profitLabels = ['Total Profit', 'Your Profit' , "Mee Panyar's Profit"];
  const currencyUnits = [' Ks', ' Ks', ' Ks'];
  const zeroes = [0, 0];
  
  return (
    <div className={classes.modalContents}>
      <div className={classes.valueWrappers}>
        <TextWrapper title={''} labels={profitLabels.slice(0, 1)} numbers={props.profitNumbers} units={currencyUnits.slice(0, 1)} bold />
        <Divider className={classes.invisibleDivider} />
        <TextWrapper
          title={''}
          labels={profitLabels.slice(1)}
          numbers={zeroes}
          units={currencyUnits.slice(1)}
          color="textSecondary"
          bold
        />
      </div>
      <Typography variant="h4" className={classes.confirmText}>
        Please make sure that you want to close the current period before clicking "Confirm"
      </Typography>
      <div className={classes.buttons}>
        <Button className={classes.cancelButton} color="primary" size="medium" onClick={props.onClick} variant="outlined">
          <Typography variant="body1">Cancel</Typography>
        </Button>
        <Button className={classes.confirmButton} size="medium" variant="outlined">
          <Typography variant="body1">Confirm</Typography>
        </Button>
      </div>
    </div>
  );
}
