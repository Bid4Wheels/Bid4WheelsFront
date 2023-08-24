import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';

export const Home = () => {
    const { userId } = useParams();
    const loggedInUserId = '1';
    const canEdit = userId === loggedInUserId;
    const [historyIsClicked, setHistoryIsClicked] = useState(true);
    const handleHistoryClick = () => setHistoryIsClicked(true);
    const handleReviewClick = () => setHistoryIsClicked(false);

    return (
        <Box sx={{ padding: '5%' }}>
            <Box
                className="HomeTop"
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    height: '0.05%',
                }}
            >
                <Box
                    className="ButtonsContainer"
                    sx={{ display: 'flex', gap: 3, flexDirection: 'row' }}
                >
                    <Button
                        variant={historyIsClicked ? 'contained' : 'outlined'}
                        sx={{
                            backgroundColor: historyIsClicked ? colors.water_green : 'transparent',
                            color: historyIsClicked ? 'white' : colors.water_green,
                            borderColor: colors.water_green,
                            boxShadow: theme.shadows[3],
                            fontFamily: 'Roboto',
                            fontSize: theme.typography.Small.fontSize,
                            fontWeight: 500,
                            letterSpacing: '0.4px',
                            textTransform: 'uppercase',
                            '&:hover': {
                                backgroundColor: historyIsClicked
                                    ? colors.water_green
                                    : 'transparent',
                                color: historyIsClicked ? 'white' : colors.water_green,
                                borderColor: colors.water_green,
                            },
                        }}
                        onClick={handleHistoryClick}
                    >
                        History
                    </Button>
                    <Button
                        variant={historyIsClicked ? 'outlined' : 'contained'}
                        sx={{
                            backgroundColor: historyIsClicked ? 'transparent' : colors.water_green,
                            color: historyIsClicked ? colors.water_green : 'white',
                            borderColor: colors.water_green,
                            boxShadow: theme.shadows[3],
                            fontFamily: 'Roboto',
                            fontSize: theme.typography.Small.fontSize,
                            fontWeight: 500,
                            letterSpacing: '0.4px',
                            textTransform: 'uppercase',
                            '&:hover': {
                                backgroundColor: historyIsClicked
                                    ? 'transparent'
                                    : colors.water_green,
                                color: historyIsClicked ? colors.water_green : 'white',
                                borderColor: colors.water_green,
                            },
                        }}
                        onClick={handleReviewClick}
                    >
                        Review
                    </Button>
                </Box>
            </Box>
            <Box className="DataContainer" sx={{ display: 'flex' }}>
                <ProfileCard canEdit={canEdit} userId={userId} />
            </Box>
        </Box>
    );
};
