import React from 'react';
import * as Styles from '../styles/CustomerStyles';
import Container from '@material-ui/core/Container';

class AddCustomer extends React.Component {
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Styles.HeaderDiv>
          <Styles.BackButton>
            <Styles.BackArrow />
          </Styles.BackButton>
          <Styles.HeaderText>Add New Customer</Styles.HeaderText>
        </Styles.HeaderDiv>
        <Styles.MainDiv>
          <form noValidate>
            <Styles.FieldDiv>
              <Styles.Label>Name</Styles.Label>
              <Styles.Field
                id="name"
                InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
                InputLabelProps={{ shrink: true }}
                color="primary"
                type="name"
              />
            </Styles.FieldDiv>
            <Styles.CheckDiv>
              <Styles.Check
                value="checkedA"
                color="primary"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                icon={<Styles.CheckIcon />}
                checkedIcon={<Styles.CheckedIcon />}
              />
              <Styles.CheckLabel>Select if customer is inactive</Styles.CheckLabel>
            </Styles.CheckDiv>
            <Styles.CheckDiv>
              <Styles.Check
                value="checkedA"
                color="primary"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                icon={<Styles.CheckIcon />}
                checkedIcon={<Styles.CheckedIcon />}
              />
              <Styles.CheckLabel>Meter:</Styles.CheckLabel>
              <Styles.CheckField
                id="meter"
                InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
                InputLabelProps={{ shrink: true }}
                color="primary"
                type="meter"
              />
            </Styles.CheckDiv>
            <Styles.FieldDiv style={{ marginTop: 30 }}>
              <Styles.Label>Tariff Plan</Styles.Label>
              <Styles.Field
                id="tarrif-plan"
                InputProps={{ style: { fontSize: 14 }, disableUnderline: true, autoComplete: 'off' }}
                InputLabelProps={{ shrink: true }}
                color="primary"
                type="tariff-plan"
              />
            </Styles.FieldDiv>
            <Styles.AddButton type="submit" variant="contained" color="primary">
              ADD
            </Styles.AddButton>
          </form>
        </Styles.MainDiv>
      </Container>
    );
  }
}

export default AddCustomer;
