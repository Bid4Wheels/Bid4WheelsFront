import React, { useState } from 'react';
import {
    TextField,
    FormControl,
    Checkbox,
    Button,
    FormControlLabel,
    InputAdornment,
    IconButton,
    Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [passwordTooltipOpen, setPasswordTooltipOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const isSignUpDisabled = () => {
        return (
            email === '' ||
            name === '' ||
            lastName === '' ||
            password === '' ||
            verifyPassword === '' ||
            phoneNumber === '' ||
            !acceptTerms ||
            !validateEmail(email) ||
            !validatePhoneNumber(phoneNumber) ||
            !validatePassword(password) ||
            password !== verifyPassword
        );
    };

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        return /^[0-9]{10}$/.test(phoneNumber);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                height: '100vh',
            }}
        >
            <div className="logo" style={{ border: '1px red dashed', width: '40%' }}>
                <div style={{ width: '100%', height: '500px' }}></div>
            </div>
            <div className="form" style={{ width: '33%', margin: '1rem', padding: '1rem' }}>
                <FormControl sx={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="standard"
                        sx={{ marginBottom: '20px' }}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                        <TextField
                            label="Name"
                            type="name"
                            variant="standard"
                            sx={{ marginRight: '1rem', width: '50%' }}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Last Name"
                            type="last-name"
                            variant="standard"
                            sx={{ width: '50%' }}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <TextField
                        label="Phone Number"
                        variant="standard"
                        sx={{ marginBottom: '20px' }}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="standard"
                        sx={{ marginBottom: '20px' }}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordTooltipOpen(true)} // Open tooltip on focus
                        onBlur={() => setPasswordTooltipOpen(false)} // Close tooltip on blur
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip
                                        title={
                                            <span>
                                                Password must contain:
                                                <br />
                                                - 8 characters minimum
                                                <br />
                                                - 1 uppercase letter
                                                <br />
                                                - 1 lowercase letter
                                                <br />- 1 number
                                            </span>
                                        }
                                        open={passwordTooltipOpen}
                                        placement="bottom-end"
                                    >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={(event) => event.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOutlinedIcon />
                                            ) : (
                                                <VisibilityOffOutlinedIcon />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Verify Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="standard"
                        sx={{ marginBottom: '20px' }}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(event) => event.preventDefault()}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOutlinedIcon />
                                        ) : (
                                            <VisibilityOffOutlinedIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                style={{ cursor: 'pointer' }}
                            />
                        }
                        label={
                            <span>
                                I Accept The{' '}
                                <a
                                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: 'blue',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Terms & Conditions
                                </a>
                            </span>
                        }
                        sx={{ marginBottom: '20px' }}
                        style={{ cursor: 'pointer' }}
                    />
                </FormControl>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        sx={{
                            width: '60%',
                            padding: '10px',
                            backgroundColor: '#34eb93',
                            marginRight: '20px',
                            ':hover': {
                                backgroundColor: '#34eb90',
                                color: 'white',
                            },
                        }}
                        variant="contained"
                        disabled={isSignUpDisabled()}
                    >
                        Sign Up
                    </Button>
                    <Button
                        sx={{
                            width: '40%',
                            padding: '10px',
                            color: '#34eb93',
                            borderColor: '#34eb93',
                            ':hover': {
                                backgroundColor: '#34eb93',
                                color: 'white',
                                borderColor: '#34eb93',
                            },
                        }}
                        variant="outlined"
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                </div>
            </div>
        </div>
    );
}
