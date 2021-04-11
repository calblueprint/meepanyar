import React from 'react';
import { Tabs, Tab, Typography } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import CustomerCard, { CustomerStatus } from './CustomerCard';
import { CustomerRecord } from '../../../lib/airtable/interface';
import BaseScrollView from '../../../components/BaseComponents/BaseScrollView';
import { Link, RouteComponentProps } from 'react-router-dom';
import { setCurrentCustomerIdInRedux } from '../../../lib/redux/customerData';

const styles = (theme: Theme) =>
  createStyles({
    tabs: {
      background: 'white',
    },
    tab: {
      color: `${theme.palette.divider}`,
      fontSize: '12px',
      '&:focus': {
        outline: 'none',
      },
    },
    tabPanel: {
      height: '100%',
      padding: '10px 0 0',
    },
    active: {
      height: '7px',
      width: '7px',
      borderRadius: '50%',
      backgroundColor: theme.palette.secondary.light,
      marginRight: '5px',
    },
    activeContainer: {
      padding: '10px 5px',
      display: 'inline-flex',
      alignItems: 'center',
    },
  });

export interface CustomerMenu {
  all: CustomerRecord[];
  toMeter: CustomerRecord[];
  toCollect: CustomerRecord[];
  done: CustomerRecord[];
}

interface CustomersTabMenuProps {
  classes: { tabs: string; tab: string; tabPanel: string; active: string; activeContainer: string; };
  url: string;
  customers: CustomerMenu;
}

function CustomersTabMenu(props: CustomersTabMenuProps) {
  const { classes, customers } = props;
  const [value, setValue] = React.useState('0');
  const changeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const getCustomerStatus = (customer: CustomerRecord) => {
    if (props.customers.toMeter.includes(customer)) {
      return CustomerStatus.METER;
    } else if (props.customers.toCollect.includes(customer)) {
      return CustomerStatus.PAYMENT;
    }
    return undefined;
  }

  return (
    <TabContext value={value}>
      <Tabs className={classes.tabs} textColor="primary" indicatorColor="primary" value={value} onChange={changeTab}>
        <Tab className={classes.tab} label="All" value="0" />
        <Tab className={classes.tab} label="Meter" value="1" />
        <Tab className={classes.tab} label="Payment" value="2" />
        <Tab className={classes.tab} label="Done" value="3" />
      </Tabs>
      <div className={classes.activeContainer}>
        <div className={classes.active}></div>
        <Typography variant="body1">Status: Active</Typography>
      </div>
      <BaseScrollView>
        <TabPanel className={classes.tabPanel} value="0">
          {props.customers.all.map((customer: CustomerRecord, index) => (
            <Link key={index} to={`${props.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)}>
              <CustomerCard name={customer.name} meterNumber={customer.meterNumber} amount={customer.outstandingBalance} active={customer.isactive}
              status={getCustomerStatus(customer)}/>
            </Link>
          ))}
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="1">
          {props.customers.toMeter.map((customer: CustomerRecord, index) => (
            <Link key={index} to={`${props.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)}>
              <CustomerCard name={customer.name} meterNumber={customer.meterNumber} amount={customer.outstandingBalance} active={customer.isactive}
              status={CustomerStatus.METER} />
            </Link>
          ))}
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="2">
          {props.customers.toCollect.map((customer: CustomerRecord, index) => (
            <Link key={index} to={`${props.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)}>
              <CustomerCard name={customer.name} meterNumber={customer.meterNumber} amount={customer.outstandingBalance} active={customer.isactive}
              status={CustomerStatus.PAYMENT} />
            </Link>
          ))}
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="3">
          {props.customers.done.map((customer: CustomerRecord, index) => (
            <Link key={index} to={`${props.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)}>
              <CustomerCard name={customer.name} meterNumber={customer.meterNumber} amount={customer.outstandingBalance} active={customer.isactive} />
            </Link>
          ))}
        </TabPanel>
      </BaseScrollView>
    </TabContext>
  );
}
export default withStyles(styles)(CustomersTabMenu);
