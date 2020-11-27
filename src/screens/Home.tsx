import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../lib/redux/store';
import { formatUTCDateStringToLocal } from '../lib/moment/momentUtils';

interface HomeProps {
  lastUpdated: string;
  isOnline: boolean;
}

class Home extends React.Component<HomeProps, {}> {
  render() {
    return (
      <h4>
        This is the home screen
        <p> User data last updated on: {this.props.lastUpdated}</p>
        {!this.props.isOnline ? <p>Offline</p> : null}
      </h4>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let lastUpdated = '';

  if (state.userData.lastUpdated) {
    lastUpdated = formatUTCDateStringToLocal(state.userData.lastUpdated);
  }
  const isOnline = state.userData.isOnline;
  return { lastUpdated, isOnline };
};

export default connect(mapStateToProps)(Home);
