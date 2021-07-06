import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authDetail = useSelector((state) => state.authDetail);
  const { user, loading } = authDetail;
  return (
    <Route
      {...rest}
      render={(props) =>
        !user && !loading ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
