import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateWinningAuction } from '../../store/auction/winningAuctionSlice';
import { useParams } from 'react-router-dom';

export const WinningRoute = ({ children }) => {
    const loggedIn = !!useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const { auctionId } = useParams();
    dispatch(updateWinningAuction(auctionId));
    if (loggedIn) {
        return <>{children}</>;
    } else {
        return <Navigate to={'/login'} replace />;
    }
};
