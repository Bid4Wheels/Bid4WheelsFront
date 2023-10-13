import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, CircularProgress } from '@mui/material';
import B4W_logo from '../commons/B4W_logo.svg';
import theme from '../../utils/desgin/Theme';
import colors from '../../utils/desgin/Colors';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addEmail, userSelector } from '../../store/user/UserSlice';
import { validateEmail } from '../../utils/validationFunctions';
import { useSendValidationCodeMutation } from '../../store/user/UserApi';
export function inputMail() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [sendValidationCode, { isLoading }] = useSendValidationCodeMutation();
    const userData = useSelector(userSelector);

    function handleEmailChange(e) {
        const emailValue = e.target.value;
        setEmail(emailValue);

        if (!emailValue || !validateEmail(emailValue)) {
            setEmailError('Invalid email format.');
            setIsButtonDisabled(true);
        } else {
            setEmailError('');
            setIsButtonDisabled(false);
        }
    }

    dispatch(addEmail({ email }));

    const handleContinueClick = async () => {
        const userEmail = userData.userEmail;
        const payload = {
            email: userEmail,
        };
        try {
            await sendValidationCode(payload)
                .unwrap()
                .then(
                    () => {
                        nav('/validateIdentity');
                    },
                    (err) => console.log(err),
                );
        } catch (err) {
            console.error(err);
        }
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
                <Box marginBottom={10}>
                    <Typography
                        fontSize={theme.typography.Large}
                        fontFamily={theme.typography.fontFamily}
                        fontWeight="bold"
                    >
                        Change password
                    </Typography>
                    <Typography
                        fontSize={theme.typography.SemiSmall}
                        fontFamily={theme.typography.fontFamily}
                        marginTop={4}
                    >
                        Input your email and we´ll send you a six digit code to validate your
                        identity.
                    </Typography>
                    <Typography
                        fontSize={theme.typography.SemiSmall}
                        fontFamily={theme.typography.fontFamily}
                        marginTop={4}
                    >
                        Make sure it is the email associated with your account:
                    </Typography>
                    <Box marginBottom={6} marginTop={4}>
                        <TextField
                            id="emailField"
                            label="Email"
                            variant="standard"
                            fullWidth
                            margin="normal"
                            onChange={handleEmailChange}
                            error={!!emailError}
                            helperText={emailError}
                        />
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                width: '130px',
                                height: '40px',
                                marginRight: '4%',
                                backgroundColor: colors.water_green,
                                '&:hover': { backgroundColor: colors.on_stand_water_green },
                                fontFamily: theme.typography.fontFamily,
                                fontSize: theme.typography.ButtonTypography.fontSize,
                            }}
                            disabled={isButtonDisabled}
                            onClick={handleContinueClick}
                        >
                            CONTINUE
                        </Button>
                        <Button
                            variant="outlined"
                            style={{
                                width: '170px',
                                height: '40px',
                                borderColor: colors.water_green,
                                color: colors.water_green,
                                '&:hover': { backgroundColor: colors.on_stand_water_green },
                                fontFamily: theme.typography.fontFamily,
                                fontSize: theme.typography.ButtonTypography.fontSize,
                            }}
                            onClick={() => nav('/login')}
                        >
                            BACK TO LOGIN
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
