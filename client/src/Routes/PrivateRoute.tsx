import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <h3>loading...</h3>;
  }

  if (user && user.email) {
    return children;
  }
  return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default PrivateRoute;
