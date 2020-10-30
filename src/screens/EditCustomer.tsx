import React from "react";
import * as Styles from "../styles/CustomerStyles";
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
            <Styles.FieldDiv>
              <Styles.Label>Name</Styles.Label>
              <Styles.Field
                id='namey'
                InputProps={{ style: {fontSize: 14}, disableUnderline: true, autoComplete: 'off'}}
                InputLabelProps={{ shrink: true }}
                color="primary"
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
              <Styles.CheckLabel>Select if customer has meter</Styles.CheckLabel>
            </Styles.CheckDiv>
            <Styles.FieldDiv>
              <Styles.Label>Tariff Plan</Styles.Label>
              <Styles.Field
                id='tarrif-plan'
                InputProps={{ style: {fontSize: 14}, disableUnderline: true, autoComplete: 'off'}}
                InputLabelProps={{ shrink: true }}
                color="primary"
              />
            </Styles.FieldDiv>
            <Styles.FieldDiv>
              <Styles.Label>Reason</Styles.Label>
              <Styles.Field
                id='reason'
                InputProps={{ style: {fontSize: 14}, disableUnderline: true, autoComplete: 'off'}}
                InputLabelProps={{ shrink: true }}
                color="primary"
              />
            </Styles.FieldDiv>
            <Styles.AddButton
              type="submit"
              variant="contained"
              color="primary"
            >
              SAVE
            </Styles.AddButton>
          </form>
        </Styles.MainDiv>
      </Container>
    );
  }
}

export default EditCustomer;
