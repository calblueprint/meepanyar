import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import useStyles from '../styles/FinSumStyles';

const classes = useStyles();

const FinSumCard = () => (
  <StylesProvider injectFirst>
    <Card className={classes.singleCard} elevation={0}>
      <ButtonBase>
        <CardContent className={classes.cardCon}>
          <Typography className={classes.insideText}>Financial Summary</Typography>
          <ArrowForwardIosIcon className={classes.arrow} />
        </CardContent>
      </ButtonBase>
    </Card>
  </StylesProvider>
);

export default FinSumCard;
