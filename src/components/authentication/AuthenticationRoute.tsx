import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../lib/redux/store';
import { connect } from 'react-redux';
import MPRoute from './MPRoute';

interface AuthenticatedRoute {
  isSignedIn: boolean;
  path: string;
  component: React.ComponentType<any>;
  componentProps: RouteComponentProps;
}

const AuthenticatedRoute = ({ isSignedIn, path, component, componentProps }: AuthenticatedRoute) => {
  <MPRoute
    render={() => {
      return isSignedIn ? <Redirect to={path} /> : <Redirect to="/login" />;
    }}
    component={component}
    componentProps={componentProps}
    path={path}
  />;
};

const mapStateToProps = (state: RootState) => ({
  isSignedIn: state.userData.user !== null,
});

export default connect(mapStateToProps)(MPRoute);
