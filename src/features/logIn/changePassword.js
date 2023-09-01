import {
    Grid,
    Box,
    Typography,
    Button,
    InputAdornment,
    FormControl,
    TextField,
    IconButton,
    Tooltip,
} from '@mui/material';
import B4W_logo from '../commons/B4W_logo.svg';
import React, { useState } from 'react';
import theme from '../../utils/desgin/Theme';
import colors from '../../utils/desgin/Colors';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function ChangePassword() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [toolTipOpen, setToolTipOpen] = useState(false);

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    };

    const isSubmitButtonDisabled = () => {
        return !validatePassword(newPassword) || newPassword !== verifyPassword;
    };

    const handleToolTipOpen = () => {
        setToolTipOpen(true);
    };

    const handleToolTipClose = () => {
        setToolTipOpen(false);
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
                <Box marginBottom={10} paddingRight={25}>
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
                        Your email has been validated! Input your new password:
                    </Typography>
                    <Box marginBottom={6} marginTop={4}>
                        <FormControl sx={{ width: '100%' }}>
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
                                open={toolTipOpen}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                            >
                                <TextField
                                    label="New password"
                                    variant="standard"
                                    type={showNewPassword ? 'text' : 'password'}
                                    sx={{ marginBottom: '20px' }}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    onFocus={handleToolTipOpen}
                                    onBlur={handleToolTipClose}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() =>
                                                        setShowNewPassword(!showNewPassword)
                                                    }
                                                    onMouseDown={(event) => event.preventDefault()}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? (
                                                        <VisibilityOutlinedIcon />
                                                    ) : (
                                                        <VisibilityOffOutlinedIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Tooltip>
                            <TextField
                                label="Verify password"
                                variant="standard"
                                type={showVerifyPassword ? 'text' : 'password'}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setShowVerifyPassword(!showVerifyPassword)
                                                }
                                                onMouseDown={(event) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showVerifyPassword ? (
                                                    <VisibilityOutlinedIcon />
                                                ) : (
                                                    <VisibilityOffOutlinedIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: '100px',
                            height: '40px',
                            backgroundColor: colors.water_green,
                            '&:hover': { backgroundColor: colors.on_stand_water_green },
                            fontFamily: theme.typography.fontFamily,
                            fontSize: theme.typography.ButtonTypography.fontSize,
                        }}
                        disabled={isSubmitButtonDisabled()}
                    >
                        SUBMIT
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ChangePassword;
