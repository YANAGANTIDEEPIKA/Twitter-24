
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticated, children, redirectPath = "/usersignin" }) => {
  return authenticated ? children : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
