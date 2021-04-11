import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../../lib/redux/store';
import { connect } from 'react-redux';
import LoadingComponent from '../BaseComponents/LoadingComponent';

interface AuthenticatedRouteProps {
  isLoading: boolean;
  isSignedIn: boolean;
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

const AuthenticatedRoute = ({ isLoading, isSignedIn, path, component, exact }: AuthenticatedRouteProps) => {
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Route
      render={() => {
        return isSignedIn ? <Route component={component} path={path} exact={exact} /> : <Redirect to="/login" />;
      }}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.userData.isLoading || state.siteData.isLoading,
  isSignedIn: state.userData.currentUserId !== '',
});

export default connect(mapStateToProps)(AuthenticatedRoute);
