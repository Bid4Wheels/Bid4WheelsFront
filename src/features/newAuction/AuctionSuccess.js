import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import successImage from '../commons/auction_completed.png';

const AuctionSuccess = () => {
    const handleGoToMyAuctions = () => {
        navigate('/user');
    };

    const handleReturn = () => {
        navigate('/');
    };

    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '152px',
                alignItems: 'center',
            }}
        >
            <img src={successImage} width="458px" height="393px" alt="Auction Created" />
            <Typography variant="Large" sx={{ marginTop: '78px' }}>
                Congratulations!
            </Typography>
            <Typography variant="Small" sx={{ marginTop: '10px' }}>
                Auction created successfully
            </Typography>
            <Button
                variant="contained"
                sx={{
                    padding: 'var(--1, 8px) 22px',
                    color: 'white',
                    width: '280px',
                    marginTop: '158px',
                    height: '63px',
                }}
                color="water_green"
                onClick={handleGoToMyAuctions}
            >
                GO TO MY AUCTIONS
            </Button>
            <Button
                variant="contained"
                sx={{
                    padding: 'var(--1, 8px) 22px',
                    width: '280px',
                    marginTop: '17px',
                    height: '63px',
                }}
                color="grey"
                onClick={handleReturn}
            >
                RETURN TO DASHBOARD
            </Button>
        </Box>
    );
};

export default AuctionSuccess;
