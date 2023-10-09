import React, { useState } from 'react';
import { QuestionInput } from './QuestionInput';
import { QuestionBox } from './QuestionBox';
import car1 from '../commons/temp/car1.jpeg';
import { useGetQuestionsAndAnswersByAuctionIdQuery } from '../../store/auction/questionsAndAnswersApi';
import { CircularProgress, Grid } from '@mui/material';

export function QuestionsContainer({ auctionId, authenticatedUserId, ownerId }) {
    const { data, isLoading } = useGetQuestionsAndAnswersByAuctionIdQuery(auctionId);
    const allQuestions = data;
    const [shownQuestions, setShownQuestions] = useState([]);

    console.log(allQuestions);

    if (isLoading) {
        return (
            <Grid container justifyContent="center" alignItems="center" marginTop={2}>
                <CircularProgress />
            </Grid>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
                width: '100%',
            }}
        >
            <QuestionInput
                auctionId={auctionId}
                authenticatedUserId={authenticatedUserId}
                ownerId={ownerId}
            />

            {shownQuestions.map((question, index) => (
                <QuestionBox
                    key={index}
                    question={question}
                    authenticatedUserId={authenticatedUserId}
                    ownerId={ownerId}
                    auctionId={auctionId}
                />
            ))}
        </div>
    );
}
