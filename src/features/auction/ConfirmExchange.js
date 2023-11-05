import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import confirm_exchange from '../commons/confirm_exchange.png';
import B4W_logo from '../commons/bid4wheels_logo.svg';
import theme from '../../utils/desgin/Theme';
import colors from '../../utils/desgin/Colors';
import { removeUser } from '../../store/user/UserSlice';
import { authenticatedUserApi } from '../../store/user/authenticatedUserApi';
import { auctionApi } from '../../store/auction/auctionApi';
import { tagsApiSlice } from '../../store/auction/tagsApi';
import { useDispatch } from 'react-redux';
import { Review } from './Review';
import { removeWinningAuction } from '../../store/auction/winningAuctionSlice';

export function ConfirmExchange() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [showReview, setShowReview] = useState(false);
    const [isBuyer, setIsBuyer] = useState(false);

    const navigateToLogin = () => {
        dispatch(removeUser());
        dispatch(authenticatedUserApi.util.resetApiState());
        dispatch(auctionApi.util.resetApiState());
        dispatch(tagsApiSlice.util.resetApiState());
        nav('/login');
    };

    useEffect(() => {
        dispatch(removeWinningAuction());
    }, [dispatch]);

    const handleShowReview = () => {
        setShowReview(true);
    };

    if (!showReview) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                }}
            >
                <img
                    src={confirm_exchange}
                    alt="confirm exchange"
                    style={{ width: '22%', height: 'auto' }}
                />
                <img src={B4W_logo} alt="B4W logo" style={{ width: '22%', height: 'auto' }} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '30%',
                        width: '30%',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'black',
                            fontSize: theme.typography.Large.fontSize,
                            fontWeight: 500,
                            marginTop: '2%',
                            marginBottom: '0.5%',
                        }}
                    >
                        Congratulations username!
                    </Typography>
                    <Typography
                        align="center"
                        sx={{
                            color: 'black',
                            fontSize: theme.typography.Small.fontSize,
                            fontWeight: 350,
                        }}
                    >
                        Your auction for{' '}
                        <span style={{ fontWeight: 500 }}>Toyota Corolla (2019)</span> is now over!
                        Use the following button to confirm that the car has been exchanged
                        successfully.
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '30%',
                        width: '30%',
                    }}
                >
                    <Button
                        style={{
                            backgroundColor: colors.water_green,
                            color: 'white',
                            textTransform: 'none',
                            width: '40%',
                            height: 'fit-content',
                            marginTop: '7.5%',
                            marginBottom: '2.5%',
                            fontSize: theme.typography.Small.fontSize,
                        }}
                        onClick={handleShowReview}
                    >
                        CONFIRM EXCHANGE
                    </Button>
                    <Button
                        style={{
                            backgroundColor: 'grey',
                            color: 'white',
                            textTransform: 'none',
                            marginBottom: '30px',
                            width: '40%',
                            height: 'fit-content',
                            fontSize: theme.typography.Small.fontSize,
                        }}
                        onClick={navigateToLogin}
                    >
                        GO TO LOGIN
                    </Button>
                </Box>
            </Box>
        );
    }

    return <Review navigateToLogin={navigateToLogin} isBuyer={isBuyer} />;
}
