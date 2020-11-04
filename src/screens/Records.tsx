import React, { useState, useEffect } from "react";
import * as Styles from "../styles/RecordsStyles";
import * as BaseStyles from "../styles/CustomerStyles";
import Container from "@material-ui/core/Container";
import { TabContext, TabPanel } from "@material-ui/lab";
import Paper from '@material-ui/core/Paper';
import { InvoiceRecord, PaymentRecord } from '../utils/airtable/interface';
import Invoice from '../components/Invoice';
import Payment from '../components/Payment';
import createMuiTheme from '@material-ui/styles'
import { getAllInvoices, getAllPayments } from '../utils/airtable/requests';

interface RecordsState {
  value: string;
  invoices: InvoiceRecord[];
  payments: PaymentRecord[];
}

export default class Records extends React.Component<{}, RecordsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: "0",
      invoices: [],
      payments: [],
    }
  }

  changeTab = (event: any, newValue: string): void => {
    this.setState({
      value: newValue,
    });
  };

  componentDidMount(): void {
    getAllInvoices().then((records) => {
      this.setState({invoices: records});
      console.log(this.state.invoices);
    });
    getAllPayments().then((records) => {
      this.setState({payments: records});
      console.log(this.state.payments)
    });
  }

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
              {this.state.invoices.map((invoice: InvoiceRecord) => (
                <Invoice
                  date={invoice.date}
                  used_kwh={invoice.amount}
                  amount_ks={invoice.amount}
                />
              ))}
            </TabPanel>
            <TabPanel value="1" id="payments">
              {this.state.payments.map((payment: PaymentRecord) => (
                <Payment
                  date={payment.date}
                  amount_ks={payment.amount}
                />
              ))}
            </TabPanel>
            </Styles.ScrollDiv>
          </TabContext>
        </Styles.MainDiv>
      </Container>
    );
  }
}
