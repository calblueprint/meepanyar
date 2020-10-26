import React from "react";
import * as Styles from "../styles/AddCustomerStyles";
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
            <Styles.Label>Name</Styles.Label>
            <Styles.Field
              id='standard-secondary'
              InputProps={{ style: {fontSize: 14}, disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              color="primary"
              type="name"
            />
            <br />
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
            <br /><br />
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
                id='standard-secondary'
                InputProps={{ style: {fontSize: 14}, disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                color="primary"
                type="meter"
              />
            </Styles.CheckDiv>
            <br /><br />
            <Styles.Label>Tariff Plan</Styles.Label>
            <Styles.Field
              id='standard-secondary'
              InputProps={{ style: {fontSize: 14}, disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              color="primary"
              type="tariff-plan"
            />
            <br></br>
            <br></br>
            <Styles.AddButton
              type="submit"
              variant="contained"
              color="primary"
            >
              Add
            </Styles.AddButton>
          </form>
        </Styles.MainDiv>
      </Container>
    );
  }
}

export default AddCustomer;
