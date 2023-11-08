import React, { useEffect, useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { Box, Pagination, Typography, CircularProgress } from '@mui/material';
import { useGetUserReviewsQuery } from '../../../../store/auction/reviewApi';

export const UserReviews = ({ userId }) => {
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [reviews, setReviews] = useState([]);

    const { data: userReviews, isLoading, error } = useGetUserReviewsQuery(userId);

    useEffect(() => {
        if (userReviews) {
            setReviews(userReviews);
        }
    }, [userReviews, userId]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedReviews = reviews.slice(startIndex, endIndex);

    return (
        <Box
            flex="1"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                ml: '60px',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center',
                }}
            >
                {isLoading ? (
                    <CircularProgress size={60} /> // Loading spinner
                ) : userReviews && userReviews.length === 0 ? (
                    <Typography variant="h6">No reviews available.</Typography>
                ) : (
                    displayedReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            userImage={review.reviewer.imageURL}
                            userName={review.reviewer.name}
                            userLastName={review.reviewer.lastName}
                            reviewValue={review.rating}
                            reviewOrigin={review.auctionName}
                            review={review.review}
                            reviewDate={review.createdAt}
                        />
                    ))
                )}
            </Box>
            {userReviews && userReviews.length > 0 && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-end"
                    marginTop="20px"
                    height="5%"
                >
                    <Pagination
                        count={Math.ceil(reviews.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(event, page) => handlePageChange(page)}
                        color="water_green"
                        sx={{ marginTop: '20px' }} // Adjust the margin at the top
                    />
                </Box>
            )}
        </Box>
    );
};
