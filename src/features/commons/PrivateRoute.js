import React from 'react';
import { AuthenticatedUser } from './AuthenticatedUser';
import Header from './Header';
import { Navigate, Route } from 'react-router-dom';

export const PrivateRoute = ({ path, Component }) => {
    const loggedIn = AuthenticatedUser();
    return loggedIn ? (
        <>
            <Header />
            <Route path={path} Component={Component} />
        </>
    ) : (
        <Navigate to="/login" replace />
    );
};
