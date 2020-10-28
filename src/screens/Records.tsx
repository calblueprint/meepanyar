import React from "react";
import * as Styles from "../styles/RecordsStyles";
import * as Theme from "../styles/ThemeStyles";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import Recipe from '../components/Recipe';

interface RecordsState {
  value: string;
}

export default class Records extends React.Component<{}, RecordsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: "0",
    };
  }

  changeTab = (event: any, newValue: string): void => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    return (
      <ThemeProvider theme={Theme.theme}>
        <Container component="main" maxWidth="xs">
          <Styles.HeaderDiv>
            <Styles.BackButton>
              <Styles.BackArrow />
            </Styles.BackButton>
            <Styles.HeaderText>Records</Styles.HeaderText>
          </Styles.HeaderDiv>
          <Styles.MainDiv>
            <TabContext value={this.state.value}>
              <Styles.RecordAppBar position="static">
                <Styles.RecordTabs
                  theme={Theme.theme}
                  indicatorColor="primary"
                  value={this.state.value}
                  onChange={this.changeTab}
                >
                  <Styles.RecordTab label="Invoices" value="0" />
                  <Styles.RecordTab label="Payment" value="1" />
                </Styles.RecordTabs>
              </Styles.RecordAppBar>
              <TabPanel value="0">Item One</TabPanel>
              <TabPanel value="1">Item Two</TabPanel>
            </TabContext>
          </Styles.MainDiv>
        </Container>
      </ThemeProvider>
    );
  }
}
