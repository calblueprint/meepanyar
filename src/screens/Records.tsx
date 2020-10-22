import React from "react";
import * as Styles from "../styles/RecordsStyles";
import Container from '@material-ui/core/Container';
import { Box, Typography, AppBar, Tabs, Tab } from '@material-ui/core';
import { TabPanel } from '@material-ui/lab';
import PropTypes from 'prop-types';

class AddCustomer extends React.Component {
  render() {
    const [value, setValue] = React.useState('0');
    const [index] = React.useState(0);
    const handleChange = (event: any, newValue: any) => {
      setValue(newValue);
    };

    return (
      <Container component="main" maxWidth="xs">
        <Styles.HeaderDiv>
          <Styles.BackButton>
            <Styles.BackArrow />
          </Styles.BackButton>
          <Styles.HeaderText>Records</Styles.HeaderText>
        </Styles.HeaderDiv>
        <Styles.MainDiv>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Styles.MainDiv>
      </Container>
    );
  }
}

export default AddCustomer;
