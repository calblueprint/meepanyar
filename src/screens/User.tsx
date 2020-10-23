import React from "react";
import CustomerCards from "../components/CustomerCard"
import * as Styles from "../styles/UserStyle";
import UserSearchBar from "../components/UserSearchBar"
import CustomerCard from "../components/CustomerCard";

let customers = [
    { name: 'jen', amount: 5 },
    { name: 'emma', amount: 6 },
    { name: 'tiff', amount: 7 },
    { name: 'jul', amount: 9 },
]
class User extends React.Component {


    render() {
        let today = new Date()
        return (
            <div>
                <Styles.HeaderWrapper>
                    <Styles.Title>Customers</Styles.Title>
                    <UserSearchBar name='hi' />
                </Styles.HeaderWrapper>
                <ul>
                    {customers.map(cus => (
                        <CustomerCard name={cus.name} amount={cus.amount} date={today.toDateString()} />
                    ))}
                </ul>
            </div>
        )
    }
};

export default User;
