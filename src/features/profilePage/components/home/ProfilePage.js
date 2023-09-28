import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';
import { useGetUserByIdQuery } from '../../../../store/user/authenticatedUserApi';
import { useSelector } from 'react-redux';
import AuctionHorizontalCardList from '../../../commons/AuctionHorizontalCardList';
import { useGetAuctionsByUserIdQuery } from '../../../../store/auction/auctionApi';

export const ProfilePage = () => {
    const nav = useNavigate();
    const { userId: queryUserId } = useParams();
    const canEdit = !queryUserId;
    const currentUser = useSelector((state) => state.user);
    const userId = queryUserId || currentUser.userId;
    const [historyIsClicked, setHistoryIsClicked] = useState(true);
    const handleHistoryClick = () => setHistoryIsClicked(true);
    const handleReviewClick = () => setHistoryIsClicked(false);
    const {
        data: userData,
        isLoading,
        isError,
        refetch: refetchUserData,
    } = useGetUserByIdQuery(userId);
    const [userProfileData, setUserProfileData] = useState({
        username: '',
        name: '',
        surname: '',
        mail: '',
        phone: '',
        imageUrl: 'default',
    });
    const fullNameBuilder = (name, lastName) => {
        return name + ' ' + lastName;
    };
    useEffect(() => {
        if (!isLoading && !isError && userData) {
            setUserProfileData({
                username: fullNameBuilder(userData.name, userData.lastName),
                name: userData.name,
                surname: userData.lastName,
                mail: userData.email,
                phone: userData.phoneNumber,
                imageUrl: userData.imgURL,
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
            setUserAuctionsData(userAuctions.content);
        }
    });
    const handleCreateAuctionClick = () => {
        nav('/newAuction');
    };

    console.log(userAuctionsData);

    const dummyDataForBidsMade = [
        {
            deadline: '2023-10-19T03:00:00',
            firstImageUrl:
                'https://s3.bid4wheels.com/auction/auction_12/img0?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230928T225029Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAV6MH63FJGUMS3ZW3%2F20230928%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=890235d79c1b3dfe1a9d311d512961798f70af3f488325c270d1277375b22952',
            highestBidAmount: 300000,
            id: 12,
            status: 'OPEN',
            tagNames: ['new', 'fast'],
            title: 'Alfa Romeo',
        },
    ];

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
                    imgUrl={userProfileData.imageUrl}
                    UserId={userId}
                    Name={userProfileData.name}
                    Surname={userProfileData.surname}
                    refetchUserData={refetchUserData}
                />
                <Box
                    className="AuctionLists"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingLeft: '5%',
                        height: '100%',
                        width: '60%',
                    }}
                >
                    <Box className="BidsMade" sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            sx={{
                                color: 'black',
                                fontSize: theme.typography.Medium.fontSize,
                                paddingLeft: '2.5%',
                                fontWeight: 500,
                            }}
                        >
                            Bids Made
                        </Typography>
                        <AuctionHorizontalCardList
                            auctionList={dummyDataForBidsMade}
                        ></AuctionHorizontalCardList>
                    </Box>
                    <Box
                        className="PublishedAuctions"
                        sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                        {userAuctionsData.length === 0 ? (
                            canEdit ? (
                                <>
                                    <Typography
                                        sx={{
                                            color: 'black',
                                            fontSize: theme.typography.Medium.fontSize,
                                            paddingLeft: '2.5%',
                                            paddingBottom: '5%',
                                            fontWeight: 500,
                                        }}
                                    >
                                        You have not created any auctions
                                    </Typography>
                                    <Button
                                        style={{
                                            backgroundColor: colors.water_green,
                                            color: 'white',
                                            textTransform: 'none',
                                            padding: '20px',
                                            width: 'fit-content',
                                            height: 'fit-content',
                                            marginLeft: '2.5%',
                                        }}
                                        onClick={handleCreateAuctionClick}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: theme.typography.Small.fontSize,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Create new auction
                                        </Typography>
                                    </Button>
                                </>
                            ) : (
                                <Typography
                                    sx={{
                                        color: 'black',
                                        fontSize: theme.typography.Medium.fontSize,
                                        paddingLeft: '2.5%',
                                        fontWeight: 500,
                                    }}
                                >
                                    This user has not created any auctions yet
                                </Typography>
                            )
                        ) : (
                            <>
                                <Typography
                                    sx={{
                                        color: 'black',
                                        fontSize: theme.typography.Medium.fontSize,
                                        paddingLeft: '2.5%',
                                        fontWeight: 500,
                                    }}
                                >
                                    Published auctions
                                </Typography>
                                <AuctionHorizontalCardList
                                    auctionList={userAuctionsData}
                                ></AuctionHorizontalCardList>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
