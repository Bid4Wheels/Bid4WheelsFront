import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
    const loggedIn = !!useSelector((state) => state.user.token);
    if (loggedIn) {
        return <>{children}</>;
    } else {
        return <Navigate to={'/login'} replace />;
    }
};
