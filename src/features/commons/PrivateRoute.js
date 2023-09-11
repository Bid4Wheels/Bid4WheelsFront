import React from 'react';
import Header from './Header';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
    const loggedIn = !!useSelector((state) => state.user.token);
    if (!children) return loggedIn ? <Header /> : <Navigate to="/login" replace />;
    return loggedIn ? (
        <>
            <Header />
            {children}
        </>
    ) : (
        <Navigate to="/login" replace />
    );
};
