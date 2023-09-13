import { Grid, Box, Typography, Button, Input } from '@mui/material';
import B4W_logo from '../commons/B4W_logo.svg';
import React from 'react';
import theme from '../../utils/desgin/Theme';
import colors from '../../utils/desgin/Colors';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/UserSlice';
import { useGetValidationCodeQuery } from '../../store/user/UserApi';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function ValidateIdentity() {
    const [validationCode, setValidationCode] = useState('');
    const navigate = useNavigate();
    const userData = useSelector(userSelector);

    const [getValidationCode] = useGetValidationCodeQuery();

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
            code: validationCode,
        };
        try {
            const response = await getValidationCode(payload).unwrap();
            if (response === 200) {
                navigate('/changePassword');
            }
            if (response === 400) {
                console.log('Invalid code'); //change to alert
                setValidationCode('');
            }
            if (response === 404) {
                console.log('Email not found'); //change to alert
                navigate('/login');
            }
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
