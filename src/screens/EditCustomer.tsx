import React from "react";
import * as Styles from "../styles/EditCustomerStyles";
import Container from '@material-ui/core/Container';

class EditCustomer extends React.Component {
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Styles.HeaderDiv>
          <Styles.BackButton>
            <Styles.BackArrow />
          </Styles.BackButton>
          <Styles.HeaderText>Edit Customer</Styles.HeaderText>
        </Styles.HeaderDiv>
        <Styles.MainDiv>
          <form noValidate>
            <Styles.Label>Name</Styles.Label>
            <Styles.Field
              id='standard-secondary'
              InputProps={{ style: {fontSize: 14}, disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              color="primary"
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
              <Styles.CheckLabel>Select if customer has meter</Styles.CheckLabel>
            </Styles.CheckDiv>
            <br /><br />
            <Styles.Label>Tariff Plan</Styles.Label>
            <Styles.Field
              id='standard-secondary'
              InputProps={{ style: {fontSize: 14}, disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              color="primary"
            />
            <br /><br />
            <Styles.Label>Reason</Styles.Label>
            <Styles.Field
              id='standard-secondary'
              InputProps={{ style: {fontSize: 14}, disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              color="primary"
            />
            <br></br>
            <br></br>
            <Styles.AddButton
              type="submit"
              variant="contained"
              color="primary"
            >
              Edit
            </Styles.AddButton>
          </form>
        </Styles.MainDiv>
      </Container>
    );
  }
}

export default EditCustomer;
