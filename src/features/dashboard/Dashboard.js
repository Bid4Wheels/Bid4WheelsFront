import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import CloseIcon from '@mui/icons-material/Close';
import { Filter } from '../filter/Filter';
import {
    useGetAuctionListQuery,
    useGetFilteredAuctionsQuery,
} from '../../store/auction/auctionApi';

export function Dashboard() {
    const [selectedButton, setSelectedButton] = useState('Ending Soon');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const {
        data: filteredData,
        isLoading: isFilteredLoading,
        error: filteredError,
        getFilteredAuctions,
    } = useGetFilteredAuctionsQuery();
    const { data, isLoading, isError } = useGetAuctionListQuery(1, 10);

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
                    {!(filteredData === undefined || filteredData.length === null) && (
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
            {isFilterOpen && <Filter setFilteredAuctions={getFilteredAuctions} />}
        </Box>
    );
}
