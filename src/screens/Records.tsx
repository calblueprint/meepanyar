import React, {useState, useEffect} from "react";
import * as Styles from "../styles/RecordsStyles";
import * as BaseStyles from "../styles/CustomerStyles";
import Container from "@material-ui/core/Container";
import { TabContext, TabPanel } from "@material-ui/lab";
import Paper from '@material-ui/core/Paper';
import Invoice from '../components/Invoice';
import Payment from '../components/Payment';
import createMuiTheme from '@material-ui/styles'

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
      <Container component="main" maxWidth="xs">
        <BaseStyles.HeaderDiv>
          <BaseStyles.BackButton>
            <BaseStyles.BackArrow />
          </BaseStyles.BackButton>
          <Styles.HeaderText>Records</Styles.HeaderText>
        </BaseStyles.HeaderDiv>
        <Styles.MainDiv>
          <TabContext value={this.state.value}>
            <Styles.RecordAppBar position="static">
              <Styles.RecordTabs
                textColor="primary"
                indicatorColor="primary"
                value={this.state.value}
                onChange={this.changeTab}
              >
                <Styles.RecordTab label="Invoices" value="0" />
                <Styles.RecordTab label="Payment" value="1" />
              </Styles.RecordTabs>
            </Styles.RecordAppBar>
            <Styles.ScrollDiv>
            <TabPanel value="0" id="invoices">
                <Invoice
                  date={"10.29.2020"}
                  used_kwh={123}
                  amount_ks={456}
                />
                <Invoice
                  date={"10.28.2020"}
                  used_kwh={789}
                  amount_ks={123}
                />
                <Invoice
                  date={"10.28.2020"}
                  used_kwh={789}
                  amount_ks={123}
                />
                <Invoice
                  date={"10.28.2020"}
                  used_kwh={789}
                  amount_ks={123}
                />
                <Invoice
                  date={"10.28.2020"}
                  used_kwh={789}
                  amount_ks={123}
                />
                <Invoice
                  date={"10.28.2020"}
                  used_kwh={789}
                  amount_ks={123}
                />
                <Invoice
                  date={"10.28.2020"}
                  used_kwh={789}
                  amount_ks={123}
                />
                <Invoice
                  date={"10.28.2020"}
                  used_kwh={789}
                  amount_ks={123}
                />

            </TabPanel>
            <TabPanel value="1" id="payments">
              <Payment
                date={"02.02.2020"}
                amount_ks={1212}
              />
              <Payment
                date={"03.05.2020"}
                amount_ks={3434}
              />
            </TabPanel>
            </Styles.ScrollDiv>
          </TabContext>
        </Styles.MainDiv>
      </Container>
    );
  }
}
