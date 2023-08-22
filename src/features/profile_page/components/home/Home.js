import React, { useState } from 'react';
import { ButtonsContainer, DataContainer, Header, Wrapper } from './styledHome';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ProfileCard } from './ProfileCard';

export const Home = () => {
    const { userId } = useParams();
    const [historyIsClicked, setHistoryIsClicked] = useState(true);
    const handleHistoryClick = () => setHistoryIsClicked(true);
    const handleReviewClick = () => setHistoryIsClicked(false);
    return (
        <Wrapper>
            <Header>
                <ButtonsContainer>
                    <Button
                        variant={historyIsClicked ? 'contained' : 'outlined'}
                        className={historyIsClicked ? 'GreenButton' : 'GreenOutlinedButton'}
                        onClick={handleHistoryClick}
                    >
                        History
                    </Button>
                    <Button
                        variant={historyIsClicked ? 'outlined' : 'contained'}
                        className={historyIsClicked ? 'GreenOutlinedButton' : 'GreenButton'}
                        onClick={handleReviewClick}
                    >
                        Review
                    </Button>
                </ButtonsContainer>
            </Header>
            <DataContainer>
                <ProfileCard />
            </DataContainer>
        </Wrapper>
    );
};
