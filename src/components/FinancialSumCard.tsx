import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  StylesProvider,
  ButtonBase,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { RouteComponentProps } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    cardCon: {
      flexDirection: 'row',
      display: 'flex',
      width: '308.81px',
      textAlign: 'left',
    },
    arrow: {
      color: '#ff922e',
      fontSize: '18px',
    },
    insideText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '22px',
      color: '#ff7a00',
      flexGrow: 1,
    },
    singleCard: {
      width: '308.81px',
      height: '57.04px',
      background: '#ffe3ca',
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '31.97px',
    },
  });

interface FinSumProps {
  classes: { cardCon: string; arrow: string; insideText: string; singleCard: string };
}

function FinSumCard(props: FinSumProps) {
  const { classes } = props;
  return (

    <Card className={classes.singleCard} elevation={0}>
      <ButtonBase>
        <CardContent className={classes.cardCon}>
          <Typography className={classes.insideText}>Financial Summary</Typography>
          <ArrowForwardIosIcon className={classes.arrow} />
        </CardContent>
      </ButtonBase>
    </Card>

  );
}

export default withStyles(styles)(FinSumCard);
