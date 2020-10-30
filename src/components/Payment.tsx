import React from 'react';
import Container from "@material-ui/core/Container";
import * as Styles from "../styles/RecordStyles";

interface PaymentProps {
  date: string;
  amount_ks: number;
}

const Payment: React.FC<PaymentProps> = ({
  date,
  amount_ks,
}) => {
  return (
    <Container component="main" maxWidth="xs">
      <Styles.Container>
        <Styles.DateLabel>{date}</Styles.DateLabel>
        <Styles.MainDiv>
          <Styles.Label>{amount_ks} Ks</Styles.Label>
        </Styles.MainDiv>
      </Styles.Container>
    </Container>
  );
};

export default Payment
