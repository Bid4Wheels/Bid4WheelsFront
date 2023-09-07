import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import bid4wheels_logo from '../commons/bid4wheels_logo.svg';
import colors from '../../utils/desgin/Colors';
import { removeUser } from '../../store/user/UserSlice';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const userId = user.userId;
    //const token = user.token;

    const handleLogoClick = () => {
        navigate('/');
    };

    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch(removeUser());
        navigate('/login');
    };

    const handleAccountClick = () => {
        navigate(`/user/${userId}`);
    };

    const handleAuctionsClick = () => {
        navigate('/');
    };

    const handleCreateAuctionClick = () => {
        navigate('/auction/new');
    };

    if (
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/validateIdentity'
    ) {
        return null;
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', minWidth: '700px' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={bid4wheels_logo}
                        alt="Bid4Wheels Logo"
                        onClick={handleLogoClick}
                        style={{ marginLeft: '1rem', cursor: 'pointer' }}
                    />
                    <Box
                        sx={{
                            ml: '2rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="h7"
                            sx={{
                                color: 'black',
                                cursor: 'pointer',
                                marginLeft: '1rem',
                                fontWeight: location.pathname === '/' ? 650 : 400,
                            }}
                            onClick={handleAuctionsClick}
                        >
                            Auctions
                        </Typography>
                        <Typography
                            variant="h7"
                            sx={{
                                color: 'black',
                                cursor: 'pointer',
                                ml: '1rem',
                                mr: '1rem',
                                fontWeight: location.pathname === '/auction/new' ? 650 : 400,
                            }}
                            onClick={handleCreateAuctionClick}
                        >
                            Create Auction
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        style={{
                            backgroundColor: colors.water_green,
                            color: 'black',
                            textTransform: 'none',
                            padding: '5px',
                            marginRight: '10px',
                        }}
                        onClick={handleAccountClick}
                    >
                        <PersonIcon sx={{ width: '20px' }} />
                        <Typography sx={{ ml: '6px', mr: '3px', fontWeight: 500 }}>
                            Account
                        </Typography>
                    </Button>
                    <Button
                        style={{
                            backgroundColor: '#FC4141',
                            color: 'black',
                            textTransform: 'none',
                            padding: '5px',
                        }}
                        onClick={handleLogoutClick}
                    >
                        <Typography sx={{ ml: '3px', mr: '3px', fontWeight: 500 }}>
                            Logout
                        </Typography>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
