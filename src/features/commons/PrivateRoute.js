import React from 'react';
import { AuthenticatedUser } from './AuthenticatedUser';
import Header from './Header';
import { Navigate, Route, Routes } from 'react-router-dom';

export const PrivateRoute = ({ path, Component }) => {
    const loggedIn = AuthenticatedUser();
    return loggedIn ? (
        <>
            <Header />
            <Routes>
                <Route path={path} Component={Component} />
            </Routes>
        </>
    ) : (
        <Navigate to="/login" replace />
    );
};
