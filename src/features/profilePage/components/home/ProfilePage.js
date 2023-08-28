import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';
import { useGetUserByIdQuery } from '../../../../store/user/UserApi';

export const ProfilePage = () => {
    const { userId } = useParams();
    const canEdit = !userId;
    const [historyIsClicked, setHistoryIsClicked] = useState(true);
    const handleHistoryClick = () => setHistoryIsClicked(true);
    const handleReviewClick = () => setHistoryIsClicked(false);

    const { data: userData, isLoading, isError, error } = useGetUserByIdQuery(userId);

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    color: colors.water_green,
                }}
            >
                <CircularProgress size={80} />
            </div>
        );
    }
    if (isError) {
        return (
            <Typography>
                sx=
                {{
                    color: 'black',
                    fontSize: theme.typography.Medium.fontSize,
                    textDecoration: 'underline',
                }}
                {error.message}
            </Typography>
        );
    }

    return (
        <Box sx={{ padding: '5%' }}>
            <Box
                className="HomeTop"
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                }}
            >
                <Box
                    className="ButtonsContainer"
                    sx={{ display: 'flex', gap: 3, flexDirection: 'row' }}
                >
                    <Button
                        variant={historyIsClicked ? 'contained' : 'outlined'}
                        style={{
                            backgroundColor: historyIsClicked ? colors.water_green : 'transparent',
                            color: historyIsClicked ? 'white' : colors.water_green,
                            borderColor: colors.water_green,
                            boxShadow: theme.shadows[3],
                            fontSize: theme.typography.Small.fontSize,
                            fontWeight: 500,
                            letterSpacing: '0.4px',
                            textTransform: 'uppercase',
                        }}
                        onClick={handleHistoryClick}
                    >
                        History
                    </Button>
                    <Button
                        variant={historyIsClicked ? 'outlined' : 'contained'}
                        style={{
                            backgroundColor: historyIsClicked ? 'transparent' : colors.water_green,
                            color: historyIsClicked ? colors.water_green : 'white',
                            borderColor: colors.water_green,
                            boxShadow: theme.shadows[3],
                            fontSize: theme.typography.Small.fontSize,
                            fontWeight: 500,
                            letterSpacing: '0.4px',
                            textTransform: 'uppercase',
                        }}
                        onClick={handleReviewClick}
                    >
                        Review
                    </Button>
                </Box>
            </Box>
            <Box className="DataContainer" sx={{ display: 'flex' }}>
                <ProfileCard
                    canEdit={canEdit}
                    Username={userData.name}
                    Email={userData.email}
                    Phone={userData.phoneNumber}
                />
            </Box>
        </Box>
    );
};
