import React from 'react';
import { AuthenticatedUser } from './AuthenticatedUser';
import Header from './Header';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ Component }) => {
    const loggedIn = AuthenticatedUser();
    if (!Component) return loggedIn ? <Header /> : <Navigate to="/login" replace />;
    return loggedIn ? (
        <>
            <Header />
            <Component />
        </>
    ) : (
        <Navigate to="/login" replace />
    );
};
