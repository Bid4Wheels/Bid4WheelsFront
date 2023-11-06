import React, { useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { Box, Pagination, Rating, Typography } from '@mui/material';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';

export const UserReviews = ({ reviews }) => {
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedReviews = reviews.slice(startIndex, endIndex);

    return (
        <Box>
            <Box height="500px">
                {displayedReviews.map((review, index) => (
                    <ReviewCard
                        key={index}
                        userImage={review.userImage}
                        userName={review.userName}
                        reviewValue={review.reviewValue}
                        reviewOrigin={review.reviewOrigin}
                        review={review.review}
                        reviewDate={review.reviewDate}
                    />
                ))}
            </Box>
            <Box display="flex" justifyContent="center" alignItems="flex-end" marginTop="20px">
                <Pagination
                    count={Math.ceil(reviews.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, page) => handlePageChange(page)}
                    color="water_green"
                />
            </Box>
        </Box>
    );
};
