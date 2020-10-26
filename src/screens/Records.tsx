import React from "react";
import * as Styles from "../styles/RecordsStyles";
import Container from "@material-ui/core/Container";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";

interface RecordsProps {

}
​
interface RecordsState {
  value: string;
}
​
export default class Records extends React.Component<RecordsProps, RecordsState> {
  constructor(props: RecordsProps) {
    super(props);
    this.state = {
      value: "0",
    };
  }
​
  changeTab = (event: any, newValue: string): void => {
    this.setState({
      value: newValue,
    });
  };
​
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Styles.HeaderDiv>
          <Styles.BackButton>
            <Styles.BackArrow />
          </Styles.BackButton>
          <Styles.HeaderText>Records</Styles.HeaderText>
        </Styles.HeaderDiv>
        <Styles.MainDiv>
          <TabContext value={this.state.value}>
            <AppBar position="static">
              <Tabs
                value={this.state.value}
                onChange={this.changeTab}
              >
                <Tab label="Item One" value="0" />
                <Tab label="Item Two" value="1" />
                <Tab label="Item Three" value="2" />
              </Tabs>
            </AppBar>
            <TabPanel value="0">Item One</TabPanel>
            <TabPanel value="1">Item Two</TabPanel>
            <TabPanel value="2">Item Three</TabPanel>
          </TabContext>
        </Styles.MainDiv>
      </Container>
    );
  }
}
