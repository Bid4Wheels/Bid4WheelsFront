import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import CloseIcon from '@mui/icons-material/Close';
import { Filter } from '../filter/Filter';
import {
    useGetAuctionListQuery,
    useGetFilteredAuctionsMutation,
} from '../../store/auction/auctionApi';

export function Dashboard() {
    const [selectedButton, setSelectedButton] = useState('Ending Soon');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    //const { data, isLoading, isError } = useGetAuctionListQuery(page, size); //todavia no se usa (deberia ser para traer todos los auctions. Se puede hacer con getFiltered pasando un filter que sea vacio)
    const [GetFilteredAuctions, { data, isError, isLoading }] = useGetFilteredAuctionsMutation();

    useEffect(() => {
        setSelectedButton('Search Results');
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

    useEffect(() => {
        if (selectedButton === 'Ending Soon') {
            // Fetch 'Ending Soon' data here.
        } else if (selectedButton === 'Newly Listed') {
            // Fetch 'Newly Listed' data here.
        }
        // You can add more conditions for other button options.
    }, [selectedButton]);

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
            {selectedButton === 'Ending Soon' &&
                !false && ( //false hay que cambiarlo por el isError de la query para TODAS las auctions
                    <Typography>Ending Soon Auctions</Typography> //aca va el componente de la lista de auctions
                )}
            {selectedButton === 'Newly Listed' &&
                !false && ( //false hay que cambiarlo por el isError de la query para TODAS las auctions
                    <Typography>Newly Listed Auctions</Typography> //aca va el componente de la lista de auctions
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
