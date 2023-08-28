import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useLogInMutation } from '../../store/user/userAPI';

export function LogIn() {
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logIn, { isLoading, isError }] = useLogInMutation();

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
            await logIn(payload).unwrap();
            nav('/');
        } catch (err) {
            console.error(err);
        }
    };

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
                    {isError && (
                        <Alert severity="error">
                            There was an error while logging in. Check your email/password and try
                            again
                        </Alert>
                    )}
                    <Box
                        display="flex"
                        marginY="20px"
                        justifyContent="space-between"
                        width="100%"
                        marginBottom="12px"
                    >
                        <Link
                            href="#"
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
                    <Box display="flex" justifyContent="space-between" width="100%" margin="15px">
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#00d591',
                                color: 'white',
                                width: '45%',
                            }}
                            onClick={handleLogIn}
                            disabled={isLoading}
                        >
                            Log In
                            {isLoading && <CircularProgress size="20%" color="inherit" />}
                        </Button>
                        <Button
                            variant="outlined"
                            style={{
                                color: '#00d591',
                                width: '45%',
                                borderColor: '#34eb93',
                            }}
                            onClick={() => nav('/signup')}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
