import React from 'react';
import Header from './Header';

export const RouteWithHeader = ({ children }) => {
    return (
        <>
            <Header />
            <>{children}</>
        </>
    );
};
