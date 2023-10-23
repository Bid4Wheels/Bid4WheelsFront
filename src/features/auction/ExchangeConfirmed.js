import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography, Grid, CircularProgress } from '@mui/material';
import confirm_exchange from '../commons/confirm_exchange.png';
import B4W_logo from '../commons/bid4wheels_logo.svg';
import theme from '../../utils/desgin/Theme';
import colors from '../../utils/desgin/Colors';
import { removeUser } from '../../store/user/UserSlice';
import { authenticatedUserApi, useGetUserByIdQuery } from '../../store/user/authenticatedUserApi';
import { auctionApi, useGetAuctionByIdQuery } from '../../store/auction/auctionApi';
import { tagsApiSlice } from '../../store/auction/tagsApi';
import { useDispatch } from 'react-redux';

export function ExchangeConfirmed() {
    const userId = useParams().userId;
    const auctionId = useParams().auctionId;
    const user = useGetUserByIdQuery(userId).data || '';
    const auction = useGetAuctionByIdQuery(auctionId).data || '';
    const nav = useNavigate();
    const dispatch = useDispatch();
    const navigateToLogin = () => {
        dispatch(removeUser());
        dispatch(authenticatedUserApi.util.resetApiState());
        dispatch(auctionApi.util.resetApiState());
        dispatch(tagsApiSlice.util.resetApiState());
        nav('/login');
    };

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
                    Confirmation done
                </Typography>
                <Typography
                    align="center"
                    sx={{
                        color: 'black',
                        fontSize: theme.typography.Small.fontSize,
                        fontWeight: 350,
                    }}
                >
                    Thank you {user.name}, your exchange for {auction.brand}, {auction.model} (
                    {auction.modelYear}) has been confirmed successfully.
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
                        paddingTop: '2.5%',
                        paddingBottom: '2.5%',
                        width: '40%',
                        height: 'fit-content',
                        marginTop: '7.5%',
                        marginBottom: '2.5%',
                        fontSize: theme.typography.Small.fontSize,
                    }}
                    onClick={navigateToLogin}
                >
                    RATE MY EXPERIENCE
                </Button>
                <Button
                    style={{
                        backgroundColor: 'grey',
                        color: 'white',
                        textTransform: 'none',
                        paddingTop: '2.5%',
                        paddingBottom: '2.5%',
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
