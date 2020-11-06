import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../lib/redux/store';
import { formatUTCDateStringToLocal } from '../lib/moment/momentUtils';
import moment from 'moment';

interface HomeProps {
  lastUpdated: string;
}

class Home extends React.Component<HomeProps, {}> {
  render() {
    return (
      <h4>
        This is the home screen
        <p> User data last updated on: {this.props.lastUpdated}</p>
      </h4>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let lastUpdated = '';

  if (state.userData.lastUpdated) {
    lastUpdated = formatUTCDateStringToLocal(state.userData.lastUpdated);
  }

  return { lastUpdated };
};

export default connect(mapStateToProps)(Home);
