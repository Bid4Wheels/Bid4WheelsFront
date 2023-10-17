import React, { useEffect, useState } from 'react';
import { QuestionInput } from './QuestionInput';
import { QuestionBox } from './QuestionBox';
import { useGetQuestionsAndAnswersByAuctionIdQuery } from '../../store/auction/questionsAndAnswersApi';
import { CircularProgress, Grid } from '@mui/material';

export function QuestionsContainer({
    auctionId,
    authenticatedUserId,
    ownerId,
    isAuctionOver,
    refetch,
}) {
    const { data, isLoading } = useGetQuestionsAndAnswersByAuctionIdQuery(auctionId);
    const [shownQuestions, setShownQuestions] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const clientHeight = window.innerHeight;

            if (data && scrollHeight - (scrollTop + clientHeight) < 10) {
                const startIndex = shownQuestions.length;
                const endIndex = startIndex + 2;
                setShownQuestions([...shownQuestions, ...data.slice(startIndex, endIndex)]);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [shownQuestions, data]);

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
                    isAuctionOver={isAuctionOver}
                    refetch={refetch}
                />
            ))}
        </div>
    );
}
