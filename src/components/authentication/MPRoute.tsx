import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../lib/redux/store';
import LoadingComponent from '../BaseComponents/LoadingComponent';
import { connect } from 'react-redux';

interface MPRouteProps {
  isLoadingUserData: boolean;
  path: string;
  component: React.ComponentType<any>;
  componentProps: RouteComponentProps;
}

const MPRoute = ({ isLoadingUserData, path, component, componentProps }: MPRouteProps) => {
  const loading = isLoadingUserData;
  return loading ? <LoadingComponent /> : <Route path={path} component={component} {...componentProps} />;
};

const mapStateToProps = (state: RootState) => ({
  isLoadingUserData: state.userData.isLoading,
});

export default connect(mapStateToProps)(MPRoute);
