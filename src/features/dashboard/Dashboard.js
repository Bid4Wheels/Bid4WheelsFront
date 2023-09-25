import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import CloseIcon from '@mui/icons-material/Close';
import { Filter } from '../filter/Filter';
import {
    useGetAuctionListQuery,
    useGetEndingAuctionListQuery,
    useGetFilteredAuctionsMutation,
    useGetNewAuctionListQuery,
} from '../../store/auction/auctionApi';
import AuctionVerticalList from '../commons/AuctionVerticalList';
import { useInfiniteScroll } from '../commons/hooks';

export function Dashboard() {
    const [selectedButton, setSelectedButton] = useState('Ending Soon');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const {
        data: newData,
        isError: newIsError,
        isLoading: newIsLoading,
    } = useGetNewAuctionListQuery(page, size);
    const {
        data: endingData,
        isError: endingIsError,
        isLoading: endingIsLoading,
    } = useGetEndingAuctionListQuery(page, size);
    const [GetFilteredAuctions, { data, isError, isLoading }] = useGetFilteredAuctionsMutation();
    const ref = useRef();
    console.log(ref?.current);
    const onScroll = () => {
        // eslint-disable-next-line no-debugger
        debugger;
        setPage(page + 1);
    };
    useInfiniteScroll(ref, onScroll);

    useEffect(() => {
        setSelectedButton('Search Results');
        console.log(newData);
    }, [data]);

    const filterAuct = (filter) => {
        GetFilteredAuctions({ filter, page, size });
    };

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '15px 15%',
            }}
        >
            <Box style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Box style={{ display: 'flex' }}>
                    <Button
                        variant="text"
                        onClick={() => handleButtonClick('Ending Soon')}
                        style={{
                            fontWeight: selectedButton === 'Ending Soon' ? 'bold' : 'normal',
                            color: '#000000',
                            marginRight: '5px',
                        }}
                    >
                        Ending Soon
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => handleButtonClick('Newly Listed')}
                        style={{
                            fontWeight: selectedButton === 'Newly Listed' ? 'bold' : 'normal',
                            color: '#000000',
                            marginRight: '5px',
                        }}
                    >
                        Newly Listed
                    </Button>
                    {!(data === undefined || data.length === null) && (
                        <Button
                            variant="text"
                            onClick={() => handleButtonClick('Search Results')}
                            style={{
                                fontWeight: selectedButton === 'Search Results' ? 'bold' : 'normal',
                                color: '#000000',
                            }}
                        >
                            Search Results
                        </Button>
                    )}
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        onClick={toggleFilter}
                        startIcon={isFilterOpen ? <CloseIcon /> : null}
                        style={{
                            color: colors.water_green,
                            borderColor: colors.water_green,
                        }}
                    >
                        {isFilterOpen ? 'Close' : 'Filter'}
                    </Button>
                </Box>
            </Box>
            {isFilterOpen && <Filter filterFunct={filterAuct} page={page} size={size} />}
            {selectedButton === 'Ending Soon' && !false && (
                <Box>
                    <AuctionVerticalList
                        loaderRef={ref}
                        data={endingData}
                        isFetching={endingIsLoading}
                        error={endingIsError}
                    ></AuctionVerticalList>
                </Box>
            )}
            {selectedButton === 'Newly Listed' && !false && (
                <Box>
                    <AuctionVerticalList
                        ref={ref}
                        data={newData}
                        isFetching={newIsLoading}
                        error={newIsError}
                    ></AuctionVerticalList>
                </Box>
            )}
            {selectedButton === 'Search Results' &&
                data &&
                !isError &&
                data.content.map((auction) => (
                    <Typography key={auction.id}>
                        id: {auction.id}, title: {auction.title}, deadline: {auction.deadline},
                        status: {auction.status}
                    </Typography>
                ))}
        </Box>
    );
}
