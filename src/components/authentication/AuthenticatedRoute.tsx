import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectIsLoading, selectUserIsSignedIn } from '../../lib/redux/userData';
import LoadingComponent from '../BaseComponents/LoadingComponent';

interface AuthenticatedRouteProps {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

const AuthenticatedRoute = ({ path, component, exact }: AuthenticatedRouteProps) => {
  const isSignedIn = useSelector(selectUserIsSignedIn);
  const isLoading = useSelector(selectIsLoading);
  
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

export default AuthenticatedRoute;
