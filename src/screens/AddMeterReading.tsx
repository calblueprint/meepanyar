import React from 'react';
import BaseHeader from '../components/BaseComponents/BaseHeader';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { Typography } from '@material-ui/core';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, RouteComponentProps } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    header: {
      marginTop: '20px',
      color: theme.palette.text.primary,
    },
    content: {
      margin: '0 25px',
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    outlined: {
      display: 'block',
      textAlign: 'left',
      width: '100%',
      padding: '15px 15px 0px 15px',
      border: `1px solid ${theme.palette.text.secondary}`,
      borderRadius: '6px',
      marginTop: '10px',
    },
    label: {
      marginTop: '-55px',
      marginBottom: '40px',
    },
    secondaryText: {
      color: theme.palette.text.secondary,
      margin: '20px 10px',
    },
    form: {
      margin: '10px -5px',
    },
    textField: {
      marginLeft: '-8px',
    },
  });

interface AddMeterReadingProps extends RouteComponentProps {
  classes: { root: string; header: string; content: string; outlined: string; label: string; form: string; secondaryText: string; textField: string; };
  location: any;
}

function AddMeterReading(props: AddMeterReadingProps) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <BaseHeader title="Add Meter Reading" leftIcon="backNav" />
      </div>
      <div className={classes.content}>
        <form noValidate className={classes.form}>
          <div className={classes.secondaryText}>
            <Typography variant="body1">Date Recorded</Typography>
            <Typography variant="body1">00.00.0000</Typography>
            <Typography variant="body1" style={{ marginTop: 10 }}>Current Reading</Typography>
            <Typography variant="h2" style={{ fontSize: 22 }}>0 kWh</Typography>
          </div>
          <div className={classes.outlined}>
            <Typography variant="body1" style={{ marginBottom: 0 }}>Today</Typography>
            <Typography variant="body1" style={{ marginBottom: 15 }}>00.00.0000</Typography>
            <div className={classes.textField}>
              <TextField label={"New Meter Reading (kWh)"} id={"meter-reading"} primary={true}/>
            </div>
          </div>
          <Button label={"ADD"} />
        </form>
      </div>
    </div>
  );
}

export default withStyles(styles)(AddMeterReading);
