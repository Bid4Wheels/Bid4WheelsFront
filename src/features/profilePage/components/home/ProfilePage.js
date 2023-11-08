import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';
import { useGetUserByIdQuery } from '../../../../store/user/authenticatedUserApi';
import { useSelector } from 'react-redux';
import AuctionHorizontalCardList from '../../../commons/AuctionHorizontalCardList';
import {
    useGetAuctionsByUserIdQuery,
    useGetAuctionsByBidderIdQuery,
} from '../../../../store/auction/auctionApi';
import { UserReviews } from './UserReviews';

export const ProfilePage = () => {
    const nav = useNavigate();
    const { userId: queryUserId } = useParams();
    const canEdit = !queryUserId;
    const currentUser = useSelector((state) => state.user);
    const userId = queryUserId || currentUser.userId;
    const [historyIsClicked, setHistoryIsClicked] = useState(true);
    const [reviewIsClicked, setReviewIsClicked] = useState(false);
    const handleHistoryClick = () => {
        setHistoryIsClicked(true);
        setReviewIsClicked(false);
    };
    const handleReviewClick = () => {
        setReviewIsClicked(true);
        setHistoryIsClicked(false);
    };
    const [isFilterReviewsClicked, setIsFilterReviewsClicked] = useState(false);

    const handleFilterReviewsClick = () => {
        setIsFilterReviewsClicked(true);
        // Add any other logic you need when the button is clicked
    };
    const {
        data: biddedData,
        isLoading: isUserLoading,
        isError: isUserError,
    } = useGetAuctionsByBidderIdQuery(userId);
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
        } else if (isError) {
            nav('*');
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
    const [biddedAuctionsData, setBiddedAuctionsData] = useState([]);
    useEffect(() => {
        if (!isUserLoading && !isUserError) {
            setBiddedAuctionsData(biddedData.content);
        }
    });
    const handleCreateAuctionClick = () => {
        nav('/newAuction');
    };

    return (
        <Box sx={{ padding: '1%', height: '80vh' }}>
            <Box
                className="HomeTop"
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    height: '5%',
                }}
            >
                <Box
                    className="ButtonsContainer"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        right: '25px',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Button
                            variant={historyIsClicked ? 'contained' : 'outlined'}
                            style={{
                                backgroundColor: historyIsClicked
                                    ? colors.water_green
                                    : 'transparent',
                                color: historyIsClicked ? 'white' : colors.water_green,
                                borderColor: colors.water_green,
                                boxShadow: theme.shadows[3],
                                fontSize: theme.typography.Small.fontSize,
                                fontWeight: 500,
                                letterSpacing: '0.4px',
                                textTransform: 'uppercase',
                                marginRight: '10px', // Add margin between History and Review buttons
                            }}
                            onClick={handleHistoryClick}
                        >
                            History
                        </Button>
                        <Button
                            variant={reviewIsClicked ? 'contained' : 'outlined'}
                            style={{
                                backgroundColor: reviewIsClicked
                                    ? colors.water_green
                                    : 'transparent',
                                color: reviewIsClicked ? 'white' : colors.water_green,
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
                    </div>
                    {reviewIsClicked && (
                        <Button
                            variant={isFilterReviewsClicked ? 'contained' : 'outlined'} // Set variant based on isFilterReviewsClicked state
                            style={{
                                backgroundColor: isFilterReviewsClicked
                                    ? colors.water_green
                                    : 'transparent',
                                color: isFilterReviewsClicked ? 'white' : colors.water_green,
                                borderColor: colors.water_green,
                                boxShadow: theme.shadows[3],
                                fontSize: theme.typography.Small.fontSize,
                                fontWeight: 500,
                                letterSpacing: '0.4px',
                                textTransform: 'uppercase',
                                width: '100%',
                            }}
                            onClick={() => {
                                setIsFilterReviewsClicked(!isFilterReviewsClicked); // Toggle the state on click
                            }}
                        >
                            Filter Reviews
                        </Button>
                    )}
                </Box>
            </Box>
            <Box
                className="DataContainer"
                sx={{ display: 'flex', marginX: '2rem', marginTop: '15px', height: '100%' }}
            >
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
                {historyIsClicked ? (
                    <Box flex="1">
                        <Box
                            className="AuctionLists"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                paddingLeft: '5%',
                                height: '100%',
                            }}
                        >
                            <Box
                                className="BiddedAuctions"
                                sx={{ display: 'flex', flexDirection: 'column', height: '50%' }}
                            >
                                <Typography
                                    sx={{
                                        color: 'black',
                                        fontSize: theme.typography.Medium.fontSize,
                                        paddingLeft: '2.5%',
                                        fontWeight: 500,
                                    }}
                                >
                                    Bids made
                                </Typography>
                                {biddedAuctionsData.length === 0 ? (
                                    canEdit ? (
                                        <>
                                            <Typography
                                                sx={{
                                                    color: 'black',
                                                    fontSize: theme.typography.Small.fontSize,
                                                    paddingLeft: '2.5%',
                                                    paddingBottom: '5%',
                                                    fontWeight: 500,
                                                    alignSelf: 'center',
                                                    marginTop: '5%',
                                                }}
                                            >
                                                You have not bid in any auctions
                                            </Typography>
                                        </>
                                    ) : (
                                        <Typography
                                            sx={{
                                                color: 'black',
                                                fontSize: theme.typography.Small.fontSize,
                                                paddingLeft: '2.5%',
                                                fontWeight: 500,
                                                alignSelf: 'center',
                                                marginTop: '5%',
                                            }}
                                        >
                                            This user has not bid in any auctions yet
                                        </Typography>
                                    )
                                ) : (
                                    <>
                                        <AuctionHorizontalCardList
                                            auctionList={biddedAuctionsData}
                                        ></AuctionHorizontalCardList>
                                    </>
                                )}
                            </Box>
                            <Box
                                className="PublishedAuctions"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '50%',
                                    marginTop: '130px',
                                }}
                            >
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
                                {userAuctionsData.length === 0 ? (
                                    canEdit ? (
                                        <>
                                            <Typography
                                                sx={{
                                                    color: 'black',
                                                    fontSize: theme.typography.Small.fontSize,
                                                    paddingLeft: '2.5%',
                                                    paddingBottom: '5%',
                                                    fontWeight: 500,
                                                    alignSelf: 'center',
                                                    marginTop: '5%',
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
                                                    fontSize: theme.typography.Small.fontSize,
                                                    fontWeight: 500,
                                                    alignSelf: 'center',
                                                    marginTop: '5%',
                                                }}
                                                onClick={handleCreateAuctionClick}
                                            >
                                                Create new auction
                                            </Button>
                                        </>
                                    ) : (
                                        <Typography
                                            sx={{
                                                color: 'black',
                                                fontSize: theme.typography.Small.fontSize,
                                                paddingLeft: '2.5%',
                                                fontWeight: 500,
                                                alignSelf: 'center',
                                                marginTop: '5%',
                                            }}
                                        >
                                            This user has not created any auctions yet
                                        </Typography>
                                    )
                                ) : (
                                    <>
                                        <AuctionHorizontalCardList
                                            auctionList={userAuctionsData}
                                        ></AuctionHorizontalCardList>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <UserReviews userId={userId}></UserReviews>
                )}
            </Box>
        </Box>
    );
};
