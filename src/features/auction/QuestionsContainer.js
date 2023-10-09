import React from 'react';
import { QuestionInput } from './QuestionInput';
import { QuestionBox } from './QuestionBox';
import car1 from '../commons/temp/car1.jpeg';
import { useGetQuestionsQuery } from '../../store/QandA/QandAApi';

export function QuestionsContainer({ auctionId, authenticatedUserId, ownerId }) {
    // ... Your static questions data ...

    const {
        data: QuestionData,
        isError: QuestionIsError,
        isFetching: QuestionIsLoading,
    } = useGetQuestionsQuery(auctionId);

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

            {QuestionData &&
                QuestionData.map((question, index) => (
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
