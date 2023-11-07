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
        <Box display="flex">
            {isLoading ? (
                <CircularProgress size={60} /> // Loading spinner
            ) : userReviews && userReviews.length === 0 ? (
                <Typography variant="h6">No reviews available.</Typography>
            ) : (
                displayedReviews.map((review) => (
                    <ReviewCard
                        key={review.id} // Replace 'id' with the actual review identifier
                        userImage={review.reviewer.imageURL}
                        userName={review.reviewer.name}
                        reviewValue={review.rating}
                        reviewOrigin={review.auctionName}
                        review={review.review}
                        reviewDate={review.createdAt}
                    />
                ))
            )}
            {userReviews && userReviews.length > 0 && (
                <Box display="flex" justifyContent="center" alignItems="center" marginTop="20px">
                    <Pagination
                        count={Math.ceil(userReviews.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(event, page) => handlePageChange(page)}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
};
