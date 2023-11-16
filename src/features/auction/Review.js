import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Rating } from '@mui/material';
import confirm_exchange from '../commons/confirm_exchange.png';
import B4W_logo from '../commons/bid4wheels_logo.svg';
import theme from '../../utils/desgin/Theme';
import colors from '../../utils/desgin/Colors';
import {
    usePostOwnerReviewMutation,
    usePostWinnerReviewMutation,
} from '../../store/auction/reviewApi';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/user/UserSlice';
import { authenticatedUserApi } from '../../store/user/authenticatedUserApi';
import { auctionApi } from '../../store/auction/auctionApi';
import { tagsApiSlice } from '../../store/auction/tagsApi';

export function Review({ isBuyer }) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState(' ');
    const [sendReviewWinner] = usePostWinnerReviewMutation();
    const [sendReviewOwner] = usePostOwnerReviewMutation();
    const [auctionId] = useState(1);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const navigateToLogin = () => {
        dispatch(removeUser());
        dispatch(authenticatedUserApi.util.resetApiState());
        dispatch(auctionApi.util.resetApiState());
        dispatch(tagsApiSlice.util.resetApiState());
        nav('/login');
    };
    const sendReview = () => {
        const body = {
            rating: rating,
            review: review,
        };
        if (isBuyer) {
            sendReviewWinner({ body, auctionId });
        } else {
            sendReviewOwner({ body, auctionId });
        }
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
                    width: '50%',
                }}
            >
                <Typography
                    sx={{
                        color: 'black',
                        fontSize: theme.typography.Large.fontSize,
                        fontWeight: 500,
                        marginTop: '30px',
                        marginBottom: '20px',
                    }}
                >
                    Rate your experience as {isBuyer ? 'a buyer' : 'an auctioneer'}
                </Typography>
                <Typography
                    align="center"
                    sx={{
                        color: 'black',
                        fontSize: theme.typography.Small.fontSize,
                        fontWeight: 350,
                    }}
                >
                    <span style={{ fontWeight: 500 }}>Username</span> tell us about your experience
                    with{' '}
                    <span style={{ fontWeight: 500 }}>
                        Auction {isBuyer ? 'owner' : 'winner'} username
                    </span>{' '}
                    on the <span style={{ fontWeight: 500 }}>Auction name</span>. Your rating and
                    comment will be visible to anyone with a Bid4Wheels account:
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '35%',
                    mt: '20px',
                    mb: '5px',
                }}
            >
                <TextField
                    label="Write your review"
                    variant="standard"
                    style={{ width: '100%' }}
                    color="primary"
                    multiline
                    rowsMax={4}
                    inputProps={{ maxLength: 380 }}
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                />
                <Rating
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    sx={{ color: colors.water_green, mt: '20px', fontSize: '30px' }}
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
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
                    onClick={() => {
                        sendReview();
                        navigateToLogin();
                    }}
                >
                    SUBMIT
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
                    onClick={() => {
                        navigateToLogin();
                    }}
                >
                    GO TO LOGIN
                </Button>
            </Box>
        </Box>
    );
}
