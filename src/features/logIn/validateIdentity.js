import { Grid, Box, Typography, Button, Input, FormHelperText } from '@mui/material';
import B4W_logo from '../commons/B4W_logo.svg';
import React, { useEffect } from 'react';
import theme from '../../utils/desgin/Theme';
import colors from '../../utils/desgin/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { addValidatedCode, userSelector } from '../../store/user/UserSlice';
import { useGetValidationCodeMutation } from '../../store/user/UserApi';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';

function ValidateIdentity() {
    const [validationCode, setValidationCode] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(userSelector);
    const [error, setError] = useState(false);

    const [validateCode] = useGetValidationCodeMutation();

    function getEmail() {
        if (userData.userEmail !== null) {
            return userData.userEmail;
        }
    }

    const handleCodeChange = (event) => {
        setValidationCode(event.target.value);
    };

    const handleContinueClick = async () => {
        const userEmail = getEmail();
        const payload = {
            email: userEmail,
            passwordCode: parseInt(validationCode),
        };
        try {
            await validateCode(payload)
                .unwrap()
                .then(
                    () => {
                        dispatch(addValidatedCode({ code: true }));
                        navigate('/changePassword');
                    },
                    () => {
                        setValidationCode('');
                        setError(true);
                    },
                );
        } catch (error) {
            console.log(error);
            setValidationCode('');
        }
    };
    if (userData.token) {
        return <Navigate to={'/'} replace />;
    }
    if (userData.userEmail === null && userData.validatedCode === false) {
        return <Navigate to={'/login'} replace />;
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
                        We´ve sent you an email to your inbox, copy the six-digit code to validate
                        your identity and modify your password
                    </Typography>
                    <Box marginBottom={6} marginTop={4}>
                        <Input
                            required
                            disableUnderline
                            fullWidth
                            autoFocus
                            value={validationCode}
                            onChange={handleCodeChange}
                            inputProps={{ maxLength: 6 }}
                            error={error}
                            sx={{
                                border: '2px solid',
                                padding: '8px',
                                width: '350px',
                                borderRadius: '8px',
                                '& input': {
                                    fontSize: '25px',
                                    letterSpacing: '30px',
                                    marginLeft: '40px',
                                },
                            }}
                        ></Input>
                        {error && (
                            <FormHelperText sx={{ fontSize: '16px' }} error>
                                Invalid code.
                            </FormHelperText>
                        )}
                    </Box>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: '130px',
                            height: '40px',
                            backgroundColor: colors.water_green,
                            '&:hover': { backgroundColor: colors.on_stand_water_green },
                            fontFamily: theme.typography.fontFamily,
                            fontSize: theme.typography.ButtonTypography.fontSize,
                        }}
                        onClick={handleContinueClick}
                    >
                        CONTINUE
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ValidateIdentity;
