import { Box, Typography } from '@mui/material';
import { useEventCallback, CircularProgress } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useGetAuctionList } from '../../store/auction/auctionApi';
import AuctionCard from './AuctionCard';
import { useInfiniteScroll } from './hooks';
import colors from '../../utils/desgin/Colors';

const AuctionVerticalList = ({ ref, data, isFetching, error }) => {
    return (
        <Box>
            {error && ( // Display error message if error exists
                <Typography variant="" color={colors.red}>
                    An error occurred while fetching the data.
                </Typography>
            )}
            {data ? (
                <Box
                    sx={{
                        display: 'flex',
                        'flex-flow': 'row wrap',
                        'min-width': '700px',
                        justifyContent: 'center',
                    }}
                >
                    {data.content.map((auction) => (
                        <AuctionCard
                            key={auction}
                            endDate={auction.deadline}
                            image={auction.firstImageUrl}
                            carName={auction.title}
                            tags={auction.tagNames}
                            highestBid={auction.highestBidAmount}
                        ></AuctionCard>
                    ))}
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {isFetching ? <CircularProgress ref={ref}></CircularProgress> : null}
                </Box>
            )}
        </Box>
    );
};

export default AuctionVerticalList;
