import React from 'react';
import Container from "@material-ui/core/Container";
import * as Styles from "../styles/RecordStyles";

interface InvoiceProps {
  date: string;
  used_kwh: number;
  amount_ks: number;
}

const Invoice: React.FC<InvoiceProps> = ({
  date,
  used_kwh,
  amount_ks,
}) => {
  return (
    <Container component="main" maxWidth="xs">
      <Styles.Container>
        <Styles.DateLabel>{date}</Styles.DateLabel>
        <Styles.MainDiv>
          <Styles.Label>{used_kwh} kWh | {amount_ks} Ks</Styles.Label>
        </Styles.MainDiv>
      </Styles.Container>
    </Container>
  );
};

export default Invoice;
