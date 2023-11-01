import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
} from '@mui/material';
import B4W_logo from '../commons/B4W_logo.svg';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import colors from '../../utils/desgin/Colors';
import { useLogInMutation } from '../../store/auth/AuthApi';
import { removeUser, setUser } from '../../store/user/UserSlice';
import { authenticatedUserApi } from '../../store/user/authenticatedUserApi';
import { auctionApi } from '../../store/auction/auctionApi';
import { tagsApiSlice } from '../../store/auction/tagsApi';
import { showMessage } from '../../store/success/successSlice';

export function LogIn() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logIn, { isLoading, isError }] = useLogInMutation();

    useEffect(() => {
        dispatch(removeUser());
        dispatch(authenticatedUserApi.util.resetApiState());
        dispatch(auctionApi.util.resetApiState());
        dispatch(tagsApiSlice.util.resetApiState());
    }, []);
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    const handleLogIn = async () => {
        const payload = { email, password };
        try {
            const response = await logIn(payload).unwrap();
            const { token, id } = response;
            dispatch(setUser({ token, id, email }));
            dispatch(showMessage('Login successful!'));
            nav('/');
        } catch (err) {
            console.error(err);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogIn();
        }
    };

    function handleError() {
        if ((password == '') & (email == '')) {
            return (
                <Alert severity="error">Please fill the email and password fields to log in</Alert>
            );
        }
        return (
            <Alert severity="error">
                There was an error while logging in. Check your email/password and try again
            </Alert>
        );
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={5} style={{ padding: '0 20px' }}>
                <Box display="flex" justifyContent="center">
                    <img
                        src={B4W_logo}
                        alt="B4W logo"
                        style={{ maxWidth: '80%', height: 'auto' }}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={5} style={{ padding: '0 20px' }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    margin="auto"
                    maxWidth="400px"
                >
                    <form onKeyDown={handleKeyPress}>
                        <TextField
                            id="emailField"
                            label="Email"
                            variant="standard"
                            fullWidth
                            margin="normal"
                            onChange={handleEmailChange}
                        />
                        <TextField
                            id="passwordField"
                            label="Password"
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            onChange={handlePasswordChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? (
                                                <VisibilityOffOutlinedIcon />
                                            ) : (
                                                <VisibilityOutlinedIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {isError && handleError()}
                        <Box
                            display="flex"
                            marginY="20px"
                            justifyContent="space-between"
                            width="100%"
                            marginBottom="12px"
                        >
                            <Link
                                to={'/changePass'}
                                variant="body2"
                                className="hover-underline"
                                style={{
                                    color: '#00d591',
                                    textDecoration: 'none',
                                }}
                            >
                                Forgot Your Password?
                            </Link>
                        </Box>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: isLoading ? colors.grey : colors.water_green,
                                    color: 'white',
                                    width: '46%',
                                }}
                                onClick={handleLogIn}
                                disabled={isLoading}
                            >
                                Log In
                                {isLoading && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: 'inherit',
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: colors.water_green,
                                    borderColor: colors.water_green,
                                    width: '46%',
                                    padding: '10px',
                                    '&:hover': {
                                        backgroundColor: colors.water_green,
                                        color: 'white',
                                        borderColor: colors.water_green,
                                    },
                                }}
                                onClick={() => nav('/signup')}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}
