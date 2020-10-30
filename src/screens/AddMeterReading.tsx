import React from "react";
import * as Styles from "../styles/CustomerStyles";
import Container from '@material-ui/core/Container';

class AddMeterReading extends React.Component {
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Styles.HeaderDiv>
          <Styles.BackButton>
            <Styles.BackArrow />
          </Styles.BackButton>
          <Styles.HeaderText>Add Meter Reading</Styles.HeaderText>
        </Styles.HeaderDiv>
        <Styles.MainDiv>
          <form noValidate>
            <Styles.MeterDiv style={{marginTop: -20}}>
              <Styles.MeterLabel>Date Recorded</Styles.MeterLabel>
              <Styles.MeterLabel>00.00.0000</Styles.MeterLabel>
              <Styles.MeterLabel style={{marginTop: 10}}>Current Reading</Styles.MeterLabel>
              <Styles.MeterLabel style={{fontSize: 22}}>0 kWh</Styles.MeterLabel>
            </Styles.MeterDiv>
            <Styles.OutlinedDiv>
              <Styles.Label>Today</Styles.Label>
              <Styles.Label style={{marginBottom: 15}}>00.00.0000</Styles.Label>
              <Styles.Label style={{marginBottom: 10}}>New Meter Reading (kWh)</Styles.Label>
              <Styles.Field
                id='meter-reading'
                InputProps={{ style: {fontSize: 14}, disableUnderline: true, autoComplete: 'off'}}
                InputLabelProps={{ shrink: true }}
                color="primary"
              />
            </Styles.OutlinedDiv>
            <Styles.AddButton
              type="submit"
              variant="contained"
              color="primary"
            >
              ADD
            </Styles.AddButton>
          </form>
        </Styles.MainDiv>
      </Container>
    );
  }
}

export default AddMeterReading;
