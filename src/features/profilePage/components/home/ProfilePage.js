import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';
import { useGetUserByIdQuery } from '../../../../store/user/authenticatedUserApi';
import { useSelector } from 'react-redux';

export const ProfilePage = () => {
    //Hay que hacer que pueda agarrar el userId desde el store, sino nunca se va a ver nada cuando puedas editar
    const { userId: queryUserId } = useParams();
    const canEdit = !queryUserId;
    const currentUser = useSelector((state) => state.user);
    const userId = queryUserId || currentUser.userId;
    const [historyIsClicked, setHistoryIsClicked] = useState(true);
    const handleHistoryClick = () => setHistoryIsClicked(true);
    const handleReviewClick = () => setHistoryIsClicked(false);
    const { data: userData, isLoading, isError, error } = useGetUserByIdQuery(userId);
    const [userProfileData, setUserProfileData] = useState({
        username: '',
        mail: '',
        phone: '',
    });
    const fullNameBuilder = (name, lastName) => {
        return name + ' ' + lastName;
    };
    useEffect(() => {
        if (!isLoading && !isError && userData) {
            setUserProfileData({
                username: fullNameBuilder(userData.name, userData.lastName),
                mail: userData.email,
                phone: userData.phoneNumber,
            });
        }
    }, [userData, isLoading, isError]);

    return (
        <Box sx={{ padding: '1%', height: '80vh' }}>
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
            <Box className="DataContainer" sx={{ display: 'flex', margin: '2rem', height: '100%' }}>
                <ProfileCard
                    canEdit={canEdit}
                    Username={userProfileData.username}
                    Email={userProfileData.mail}
                    Phone={userProfileData.phone}
                />
            </Box>
        </Box>
    );
};
