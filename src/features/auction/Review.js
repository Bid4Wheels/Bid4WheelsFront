import React from 'react';
import { Box, Button, Typography, TextField, Rating } from '@mui/material';
import confirm_exchange from '../commons/confirm_exchange.png';
import B4W_logo from '../commons/bid4wheels_logo.svg';
import theme from '../../utils/desgin/Theme';
import colors from '../../utils/desgin/Colors';

export function Review({ navigateToLogin, isBuyer }) {
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
                />
                <Rating
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    sx={{ color: colors.water_green, mt: '20px', fontSize: '30px' }}
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
                    onClick={navigateToLogin}
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
                    onClick={navigateToLogin}
                >
                    GO TO LOGIN
                </Button>
            </Box>
        </Box>
    );
}
