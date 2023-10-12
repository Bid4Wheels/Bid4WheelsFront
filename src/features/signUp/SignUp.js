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
    Grid,
    Box,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import B4W_logo from '../commons/B4W_logo.svg';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useSignUpMutation } from '../../store/user/UserApi';
import colors from '../../utils/desgin/Colors';
import {
    validatePassword,
    validateEmail,
    validatePhoneNumber,
} from '../../utils/validationFunctions';

export function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [passwordTooltipOpen, setPasswordTooltipOpen] = useState(false);
    const navigate = useNavigate();
    const [signUp, { isLoading }] = useSignUpMutation();

    const handleSignUp = async () => {
        const payload = {
            name: name,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
        };

        try {
            await signUp(payload).unwrap();
            console.log('Sign up successful!');
            navigate('/login');
        } catch (error) {
            console.log('Sign up failed.');
        }
    };

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

    if (isLoading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <CircularProgress />
            </Grid>
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
                <Box sx={{ width: '70%', margin: '0 auto', padding: '1rem' }}>
                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            label="Email"
                            type="email"
                            variant="standard"
                            sx={{ marginBottom: '20px', height: '47px' }}
                            error={!validateEmail(email) && email !== ''}
                            helperText={
                                !validateEmail(email) && email !== ''
                                    ? 'Email should have the following format: "yourmail@mail.com"'
                                    : ''
                            }
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
                            sx={{ marginBottom: '20px', height: '47px' }}
                            error={!validatePhoneNumber(phoneNumber) && phoneNumber !== ''}
                            helperText={
                                !validatePhoneNumber(phoneNumber) && phoneNumber !== ''
                                    ? 'Phone number must have at least 15 digits'
                                    : ''
                            }
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type={showPassword1 ? 'text' : 'password'}
                            variant="standard"
                            sx={{
                                marginBottom:
                                    !validatePassword(password) && password !== ''
                                        ? '40px'
                                        : '20px',
                                height: '47px',
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordTooltipOpen(true)}
                            onBlur={() => setPasswordTooltipOpen(false)}
                            error={!validatePassword(password) && password !== ''}
                            helperText={
                                !validatePassword(password) && password !== ''
                                    ? 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number'
                                    : ''
                            }
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
                                                onClick={() => setShowPassword1(!showPassword1)}
                                                onMouseDown={(event) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword1 ? (
                                                    <VisibilityOffOutlinedIcon />
                                                ) : (
                                                    <VisibilityOutlinedIcon />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Verify Password"
                            type={showPassword2 ? 'text' : 'password'}
                            variant="standard"
                            sx={{ marginBottom: '20px', height: '47px' }}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            error={password !== verifyPassword && verifyPassword !== ''}
                            helperText={
                                password !== verifyPassword && verifyPassword !== ''
                                    ? 'Passwords do not match'
                                    : ''
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword2(!showPassword2)}
                                            onMouseDown={(event) => event.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword2 ? (
                                                <VisibilityOffOutlinedIcon />
                                            ) : (
                                                <VisibilityOutlinedIcon />
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
                                            color: colors.water_green,
                                            textDecoration: 'none',
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.target.style.textDecoration = 'underline')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.target.style.textDecoration = 'none')
                                        }
                                    >
                                        Terms & Conditions
                                    </a>
                                </span>
                            }
                            sx={{ marginBottom: '20px' }}
                        />
                    </FormControl>
                    <div
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Button
                            sx={{
                                width: '60%',
                                padding: '10px',
                                backgroundColor: colors.water_green,
                                marginRight: '20px',
                                ':hover': {
                                    backgroundColor: colors.water_green,
                                    color: 'white',
                                },
                            }}
                            variant="contained"
                            disabled={isSignUpDisabled() || isLoading}
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                        <Button
                            sx={{
                                width: '40%',
                                padding: '10px',
                                color: colors.water_green,
                                borderColor: colors.water_green,
                                ':hover': {
                                    backgroundColor: colors.water_green,
                                    color: 'white',
                                    borderColor: colors.water_green,
                                },
                            }}
                            variant="outlined"
                            onClick={handleLogin}
                        >
                            Log In
                        </Button>
                    </div>
                </Box>
            </Grid>
        </Grid>
    );
}
