// ** React Imports
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "@utils";

import { useSelector } from 'react-redux';

const PublicRoute = ({ children, route }) => {

  const token = useSelector(state => state.token);

  if (token === '') {
    return <Navigate to={'/login'} />;
  }

  if (route) {
    const user = getUserData();

    const restrictedRoute = route.meta && route.meta.restricted;

    if (user && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser(user.role)} />;
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PublicRoute;
