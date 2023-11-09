import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box, Typography, Card, CardContent, Rating, CardActions } from '@mui/material';
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
import CloseIcon from '@mui/icons-material/Close';
import { FilteredReviewsHeader } from './FilteredReviewsHeader';

const reviews = [
    {
        userImage: 'default',
        userName: 'John Doe',
        reviewDate: '10/5',
        reviewValue: 4.5,
        reviewOrigin: 'Verified Purchase',
        review: "I absolutely adore this product! It has made a significant impact on my daily life. The quality is unmatched, and I can't imagine my life without it now. Highly recommended!",
    },
    {
        userImage: 'default',
        userName: 'Jane Smith',
        reviewValue: 3.0,
        reviewDate: '10/3',
        reviewOrigin: 'Verified Purchase',
        review: "It's decent, but there's room for improvement. I expected more considering the price. The functionality is good, but there are some minor issues that need to be addressed.",
    },
    {
        userImage: 'default',
        userName: 'Alice Johnson',
        reviewValue: 5.0,
        reviewDate: '9/8',
        reviewOrigin: 'Verified Purchase',
        review: "I can't express how thrilled I am with this product. It has exceeded my expectations in every way possible. The build quality is exceptional, and the features it offers are nothing short of amazing. The product's performance is outstanding, and I've noticed a significant improvement in my daily tasks. This has become an indispensable part of my daily routine. I highly recommend it to everyone looking for a top-notch solution to their needs. It's worth every penny and more!",
    },

    {
        userImage: 'default',
        userName: 'John Doe',
        reviewValue: 4.5,
        reviewDate: '7/12',
        reviewOrigin: 'Verified Purchase',
        review: "I absolutely adore this product! It has made a significant impact on my daily life. The quality is unmatched, and I can't imagine my life without it now. Highly recommended!",
    },
];

export const ProfilePage = () => {
    const nav = useNavigate();
    const { userId: queryUserId } = useParams();
    const canEdit = !queryUserId;
    const currentUser = useSelector((state) => state.user);
    const userId = queryUserId || currentUser.userId;
    const [historyIsClicked, setHistoryIsClicked] = useState(true);
    const [reviewIsClicked, setReviewIsClicked] = useState(false);
    const [ratingFilter, setRatingFilter] = useState(2.5);
    const [ratingValue, setRatingValue] = useState(0);
    const [isFilterAplied, setIsFilterAplied] = useState(false);
    const [displayedReviews, setDisplayedReviews] = useState(reviews);
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

    const handleRatingChange = (event) => {
        setRatingFilter(event.target.value);
    };
    const handleFilterClick = () => {
        // Add any other logic you need when the button is clicked
        setIsFilterReviewsClicked(false);
        setRatingValue(ratingFilter);
        setDisplayedReviews(reviews.filter((review) => review.reviewValue == ratingFilter));
        setIsFilterAplied(true);
    };
    const handleClearFilter = () => {
        setIsFilterAplied(false);
        setDisplayedReviews(reviews);
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
        rating: 0,
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
                rating: userData.rating == 'NaN' ? 0 : userData.rating,
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
                        alignItems: 'end',
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
                        <div>
                            {!isFilterReviewsClicked ? (
                                <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: 'white',
                                        color: colors.water_green,
                                        borderColor: colors.water_green,
                                        boxShadow: theme.shadows[3],
                                        fontSize: theme.typography.Small.fontSize,
                                        fontWeight: 500,
                                        letterSpacing: '0.4px',
                                        textTransform: 'uppercase',
                                        '&:hover': {
                                            borderColor: colors.water_green,
                                        },
                                        paddingX: '35px',
                                    }}
                                    onClick={() => {
                                        setIsFilterReviewsClicked(!isFilterReviewsClicked);
                                    }}
                                >
                                    Filter Reviews
                                </Button>
                            ) : (
                                <Box display={'flex'} flexDirection={'column'} alignItems={'end'}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<CloseIcon />}
                                        sx={{
                                            backgroundColor: 'transparent',
                                            color: colors.water_green,
                                            borderColor: colors.water_green,
                                            boxShadow: theme.shadows[3],
                                            fontSize: theme.typography.Small.fontSize,
                                            fontWeight: 500,
                                            letterSpacing: '0.4px',
                                            textTransform: 'uppercase',
                                            '&:hover': {
                                                borderColor: colors.water_green,
                                            },
                                            width: 'fit-content',
                                            paddingX: '60px',
                                        }}
                                        onClick={() => {
                                            setIsFilterReviewsClicked(!isFilterReviewsClicked);
                                            setRatingFilter(2.5);
                                        }}
                                    >
                                        Close
                                    </Button>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            width: '322px',
                                            height: '201px',
                                            marginTop: '10px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            borderColor: colors.water_green,
                                            position: 'relative',
                                        }}
                                    >
                                        <CardContent sx={{ marginTop: '5px' }}>
                                            <Typography
                                                fontSize={theme.typography.Medium}
                                                fontWeight={500}
                                                fontFamily={theme.typography.fontFamily}
                                            >
                                                Filter reviews by rating
                                            </Typography>
                                        </CardContent>
                                        <CardActions
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Rating
                                                value={ratingFilter}
                                                precision={0.5}
                                                size="large"
                                                sx={{
                                                    '& .MuiRating-iconFilled': {
                                                        color: colors.water_green,
                                                    },
                                                    mt: '5px',
                                                    ml: '10px',
                                                    marginBottom: '20px',
                                                }}
                                                onChange={handleRatingChange}
                                            ></Rating>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    width: '107px',
                                                    height: '44px',
                                                    backgroundColor: colors.water_green,
                                                    color: 'white',
                                                    textTransform: 'none',
                                                    fontSize: theme.typography.Small.fontSize,
                                                    fontWeight: 500,
                                                    '&:hover': {
                                                        backgroundColor: colors.water_green,
                                                    },
                                                }}
                                                onClick={handleFilterClick}
                                            >
                                                Filter
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Box>
                            )}
                        </div>
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
                    ReviewValue={userProfileData.rating}
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
                    <Box
                        flex="1"
                        sx={{
                            display: 'flex',
                            ml: '60px',
                            alignItems: 'start',
                            flexDirection: 'column',
                        }}
                    >
                        {isFilterAplied && (
                            <Box display={'flex'} alignItems={'end'}>
                                <FilteredReviewsHeader filterValue={ratingValue} />
                                <Typography
                                    fontSize={'22px'}
                                    sx={{
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        ml: '20px',
                                        color: 'grey',
                                        '&:hover': {
                                            color: 'black',
                                        },
                                    }}
                                    onClick={handleClearFilter}
                                >
                                    clear filter
                                </Typography>
                            </Box>
                        )}
                        <UserReviews reviews={displayedReviews}></UserReviews>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
