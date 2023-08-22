import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ButtonsContainer, DataContainer, Header, Wrapper } from './styledHome';
import { Button } from '@mui/material';
import { ProfileCard } from './ProfileCard';

export const Home = () => {
    const { userId } = useParams();
    //hardcodeado de momento, una vez este la api hay que cambiar esto
    const loggedInUserId = '1';
    const canEdit = userId === loggedInUserId;
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
                <ProfileCard canEdit={canEdit} userId={userId} />
            </DataContainer>
        </Wrapper>
    );
};
