import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
    const { isAuthenticated, token } = useAuth();
	const location = useLocation();

	return isAuthenticated && token ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
  };

export { RequireAuth }

