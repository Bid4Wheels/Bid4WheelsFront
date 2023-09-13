import React from 'react';
import Header from './Header';

export const RoutesWithHeader = ({ children }) => {
    return (
        <>
            <Header />
            <>{children}</>
        </>
    );
};
