import { Box, Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import B4W_logo from '../commons/B4W_logo.svg';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export function LogIn() {
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} md={5} style={{ padding: '0 20px' }}>
                <Box display="flex" justifyContent="center">
                    <img
                        src={B4W_logo}
                        alt="B4W logo"
                        style={{ maxWidth: '80%', height: 'auto' }}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={5} style={{ padding: '0 20px' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <TextField
                        id="emailField"
                        label="Email"
                        variant="standard"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="passwordField"
                        label="Password"
                        variant="standard"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        margin="normal"
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
                    <Box
                        display="flex"
                        marginY="20px"
                        justifyContent="space-between"
                        width="100%"
                        marginBottom="12px"
                    >
                        <Link href="#" variant="body2">
                            Forgot your password?
                        </Link>
                    </Box>
                    <Box display="flex" justifyContent="space-between" width="80%" margin="10px">
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#00d591', color: 'white', width: '40%' }}
                        >
                            Log In
                        </Button>
                        <Button
                            variant="outlined"
                            style={{ color: '#00d591', width: '40%' }}
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
