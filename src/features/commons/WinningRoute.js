import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateWinningAuction } from '../../store/auction/winningAuctionSlice';
import { useParams } from 'react-router-dom';

export const WinningRoute = ({ children }) => {
    const id = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();
    const { auctionId } = useParams();
    dispatch(updateWinningAuction(auctionId));
    if (!!id) {
        return <Navigate to={`/${id}/${auctionId}`} replace />;
    } else {
        return <Navigate to={'/login'} replace />;
    }
};
