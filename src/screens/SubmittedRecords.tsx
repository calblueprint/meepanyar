import React from 'react';
import BaseHeader from '../components/BaseComponents/BaseHeader';
import { List, TextField, Typography, Button } from '@material-ui/core';
import OutlinedColCard from '../components/OutlinedCardList';
import { RouteComponentProps } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    content: {
      margin: '0 25px',
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    payButton: {
      borderRadius: '12px',
      height: '30px',
      width: '80px',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    viewButton: {
      borderRadius: '12px',
      height: '30px',
      width: '80px',
      color: theme.palette.primary.main,
      backgroundColor: 'white',
      border: `1px solid ${theme.palette.primary.main}`,
      zIndex: -1,
    },
    searchContainer: {
      float: 'right',
      padding: '0px 30px',
    },
    searchIcon: {
      fontSize: '20px',
      color: theme.palette.text.primary,
      marginLeft: '-28px',
    },
    search: {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '10px',
      width: '130px',
      height: '25px',
      padding: '2px 10px',
    },
    title: {
      marginTop: '20px',
    }
  });

interface SubmittedRecordsProps extends RouteComponentProps {
  classes: { root: string; content: string; payButton: string; viewButton: string; searchIcon: string; searchContainer: string; search: string; title: string; };
  location: any;
}

function SubmittedRecords(props: SubmittedRecordsProps) {
  const { classes } = props;

  //DUMMY DATA
  const unpaidInfo = [
    [{ number: 89, label: '01/02/2003', unit: '' }],
    [{ number: 20, label: '02/03/2004', unit: '' }],
    [{ number: 10, label: '04/03/2002', unit: '' }],
    [{ number: 10, label: '04/03/2002', unit: '' }],
    [{ number: 10, label: '04/03/2002', unit: '' }],
    [{ number: 10, label: '04/03/2002', unit: '' }],
    [{ number: 10, label: '04/03/2002', unit: '' }],
  ];

  const getSearch = () => {
    return (
      <div className={classes.searchContainer}>
        <TextField className={classes.search} size="small" InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }} color="primary" />
        <SearchIcon className={classes.searchIcon} />
      </div>
    );
  };

  const getPaymentButtons = () => {
    return (
      <Button className={classes.payButton} color="primary" disableElevation={true}>Pay</Button>
    );
  };

  const getViewButtons = () => {
    return (
      <Button className={classes.viewButton} color="primary" disableElevation={true}>View</Button>
    );
  };

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" title="Reports" />
      {getSearch()}
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
      <div className={classes.content}>
        <Typography className={classes.title} variant="h4">Unpaid Reports</Typography>
        {unpaidInfo.map((report: any, index) => (
          <OutlinedColCard key={report.label} info={report} primary={false} rightIcon={getPaymentButtons()} />
        ))}
        <Typography className={classes.title} variant="h4">Paid Reports</Typography>
        {unpaidInfo.map((report: any, index) => (
          <OutlinedColCard key={report.label} info={report} primary={false} rightIcon={getViewButtons()} />
        ))}
      </div>
      </List>
    </div>
  );
}

export default withStyles(styles)(SubmittedRecords);