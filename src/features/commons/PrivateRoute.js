import React from 'react';
import Header from './Header';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
    const loggedIn = !!useSelector((state) => state.user.token);
    if (loggedIn) {
        return (
            <>
                <Header />
                {children}
            </>
        );
    } else {
        return <Navigate to={'/login'} replace />;
    }
};
