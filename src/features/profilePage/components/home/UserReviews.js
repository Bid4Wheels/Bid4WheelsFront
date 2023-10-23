import React, { useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { Box, Pagination } from '@mui/material';

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

export const UserReviews = () => {
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
