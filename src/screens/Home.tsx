import { FormControl, FormHelperText, MenuItem, Select } from "@material-ui/core";
import React from "react";
//import { Nav, NavItem} from 'reactstrap';
//import { NavLink } from 'react-router-dom';
import Menu from "../components/HamburgerMenu";
import FinancialSumCard from "../components/FinancialSumCard";
import HomeInfoCard from "../components/HomeInfo";
import { mockComponent } from "react-dom/test-utils";
import * as Styles from "../styles/HomeInfoStyles";

interface HomeState {
    selectedSite: SiteData;
    sites: Array<SiteData>;
}

interface SiteData {
    name: string;
    customer: string;
    payment: string;
    unpaid: string;
    incidents: string;
}

let MockSiteData = [
    {
        "name": "Julians Panel",
        "customer": "2",
        "payment": "4",
        "unpaid": "0",
        "incidents": "1"
    },
    {
        "name": "Kyles Panel",
        "customer": "4",
        "payment": "2",
        "unpaid": "1",
        "incidents": "3"
    },
    {
        "name": "Jens Panel",
        "customer": "1",
        "payment": "3",
        "unpaid": "3",
        "incidents": "0"
    },
];


class Home extends React.Component<{}, HomeState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            selectedSite: MockSiteData[0],
            sites: MockSiteData
        }
        this.handleSiteChange = this.handleSiteChange.bind(this);
    }

    renderSite() {
        let selectedSite = this.state.selectedSite;
        return (
            <HomeInfoCard
                customer={selectedSite.customer}
                payment={selectedSite.payment}
                unpaid={selectedSite.unpaid}
                incidents={selectedSite.incidents}
            />
        );
    }

    handleSiteChange(newSite: SiteData) {
        this.setState({ selectedSite: newSite });
    }

    render() {
        let siteData = this.state.sites;
        return (
            <div>
                <Styles.Header>
                    <FormControl >
                        <Select inputProps={{ 'aria-label': 'Without label' }}>
                            {siteData.map((site: SiteData) => <MenuItem onClick={() => this.handleSiteChange(site)}>{site.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Styles.Header>
                {this.renderSite()}
                <FinancialSumCard />
            </div>
        )
    }
};

export default Home;