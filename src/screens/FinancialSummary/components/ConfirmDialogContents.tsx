import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextWrapper from '../../../components/TextWrapper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';

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
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
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
    dialogContents: {
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
    bottomMargin: {
      marginBottom: '8px',
    },
  }),
);

interface ConfirmDialogContentsProps {
  onClick: () => void;
  profitNumbers: number[];
}

export default function ConfirmDialogContents(props: ConfirmDialogContentsProps): JSX.Element {
  const intl = useInternationalization(); 
  const classes = useStyles();

  const profitLabels = [intl(words.total_x, words.profit), intl(words.your_x, words.profit), intl(words.mee_panyar_profit)];
  const currencyUnits = [` ${intl(words.ks)}`, ` ${intl(words.ks)}`, ` ${intl(words.ks)}`];
  const zeroes = [0, 0];

  return (
    <div className={classes.dialogContents}>
      <div className={classes.valueWrappers}>
        <TextWrapper
          labels={profitLabels.slice(0, 1)}
          numbers={props.profitNumbers}
          units={currencyUnits.slice(0, 1)}
          bold
          styling={classes.bottomMargin}
        />
        <TextWrapper
          labels={profitLabels.slice(1)}
          numbers={zeroes}
          units={currencyUnits.slice(1)}
          color="textSecondary"
          bold
        />
      </div>
      <Typography variant="body1" className={classes.confirmText}>
        {intl(words.please_x, words.make_sure_that_you_want_to_close_the_current_period_before_clicking_confirm)}
      </Typography>
      <div className={classes.buttons}>
        <Button className={classes.cancelButton} size="medium" onClick={props.onClick} variant="contained">
          <Typography variant="body2">{intl(words.cancel)}</Typography>
        </Button>
        <Button className={classes.confirmButton} size="medium" variant="contained">
          <Typography variant="body2">{intl(words.confirm_x, ' ')}</Typography>
        </Button>
      </div>
    </div>
  );
}
