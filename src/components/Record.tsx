import React from 'react';
import Container from "@material-ui/core/Container";
import * as Styles from "../styles/RecordStyles";

const Record = ({date, used_kwh, amount_ks}) => {
  return (
    <Container component="main" maxWidth="xs">
      <Styles.DateLabel>{date}</Styles.DateLabel>
      <Styles.MainDiv>
        <Styles.Label>{used_kwh} | {amount_ks}</Styles.Label>
      </Styles.MainDiv>
    </Container>
  );
}

export default Record;
