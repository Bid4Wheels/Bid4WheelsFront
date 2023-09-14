import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';
import { useGetUserByIdQuery } from '../../../../store/user/authenticatedUserApi';
import AuctionHorizontalCardList from '../../../commons/AuctionHorizontalCardList';
import { useGetAuctionsByUserIdQuery } from '../../../../store/auction/auctionApi';

export const ProfilePage = () => {
    //Hay que hacer que pueda agarrar el userId desde el store, sino nunca se va a ver nada cuando puedas editar
    const { userId } = useParams();
    const canEdit = !userId;
    const [historyIsClicked, setHistoryIsClicked] = useState(true);
    const handleHistoryClick = () => setHistoryIsClicked(true);
    const handleReviewClick = () => setHistoryIsClicked(false);
    const { data: userData, isLoading, isError } = useGetUserByIdQuery(userId);
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

    const {
        data: userAuctions,
        isLoading: auctionsLoading,
        isError: auctionsIsError,
    } = useGetAuctionsByUserIdQuery(userId);
    const [userAuctionsData, setUserAuctionsData] = useState([]);
    useEffect(() => {
        if (!auctionsLoading && !auctionsIsError) {
            setUserAuctionsData(userAuctions);
        }
    });

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
                <Box
                    className="AuctionLists"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        paddingLeft: '5%',
                        height: '100%',
                        width: '60%',
                    }}
                >
                    <Box
                        className="PublishedAuctions"
                        sx={{ display: 'flex', flexDirection: 'column', height: '50%' }}
                    >
                        <Typography
                            sx={{
                                color: 'black',
                                fontSize: theme.typography.Medium.fontSize,
                                paddingLeft: '2.5%',
                            }}
                        >
                            Published auctions
                        </Typography>
                        <AuctionHorizontalCardList
                            auctionList={userAuctionsData}
                        ></AuctionHorizontalCardList>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
