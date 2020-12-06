import React from 'react';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { Typography } from '@material-ui/core';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, RouteComponentProps } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    content: {
      margin: '0 25px',
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    outlined: {
      padding: '15px 15px 10px',
      border: `1px solid ${theme.palette.text.secondary}`,
      borderRadius: '6px',
      marginTop: '10px',
    },
    secondaryText: {
      color: theme.palette.text.secondary,
    },
  });

interface AddMeterReadingProps extends RouteComponentProps {
  classes: { root: string; content: string; outlined: string; secondaryText: string };
  location: any;
}

function AddMeterReading(props: AddMeterReadingProps) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <BaseHeader title="Add Meter Reading" leftIcon="backNav" />
      <div className={classes.content}>
        <form noValidate>
          <div className={classes.secondaryText}>
            <Typography variant="body1">Date Recorded</Typography>
            <Typography variant="body1">00.00.0000</Typography>
            <Typography variant="body1" style={{ marginTop: 10 }}>
              Current Reading
            </Typography>
            <Typography variant="h2" style={{ fontSize: 22 }}>
              0 kWh
            </Typography>
          </div>
          <div className={classes.outlined}>
            <Typography variant="body1" style={{ marginBottom: 0 }}>
              Today
            </Typography>
            <Typography variant="body1" style={{ marginBottom: 15 }}>
              00.00.0000
            </Typography>
            <TextField label={'New Meter Reading (kWh)'} />
          </div>
          <Button label={'ADD'} />
        </form>
      </div>
    </div>
  );
}

export default withStyles(styles)(AddMeterReading);
