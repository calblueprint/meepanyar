import React from 'react';
import { ButtonBase, IconButton, StylesProvider, Button, Card, CardContent, Paper, Typography } from '@material-ui/core';
import useStyles from '../styles/HomeInfoStyles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

type HomeInfoProps = {
  amount: string;
  name: string;
};

const classes = useStyles();

const HomeInfoRow = ({ amount, name }: HomeInfoProps) => (
  <StylesProvider injectFirst>
    <div className={classes.cardRow}>
      {amount === '0' ? (
        <ButtonBase>
          <CardContent className={classes.cardCon}>
            <ErrorOutlineIcon className={classes.error} />
            <Typography className={classes.rowTitleGrayedNum}>{amount}</Typography>
            <Typography className={classes.rowTitleGrayed}>{name}</Typography>
            <ArrowForwardIosIcon className={classes.arrow} />
          </CardContent>
        </ButtonBase>
      ) : (
          <ButtonBase>
            <CardContent className={classes.cardCon}>
              <CheckCircleIcon className={classes.check} />
              <Typography className={classes.rowTitleNum}>{amount}</Typography>
              <Typography className={classes.rowTitle}>{name}</Typography>
              <ArrowForwardIosIcon className={classes.arrow} />
            </CardContent>
          </ButtonBase>
        )}
    </div>
  </StylesProvider>
);

export default HomeInfoRow;
