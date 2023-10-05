import React from 'react';
import { QuestionInput } from './QuestionInput';
import { QuestionBox } from './QuestionBox';
import car1 from '../commons/temp/car1.jpeg';

export function QuestionsContainer({ auctionId, authenticatedUserId, ownerId }) {
    const questions = [
        {
            questionerDTO: {
                username: 'user1',
                picture: 'default',
                id: 1,
            },
            date: '2021-10-10',
            question:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non posuere ligula. Morbi et tortor ut leo pulvinar posuere. Vivamus lorem eros, placerat eu ex eget, maximus ultrices massa.',
            answer: 'Maecenas at nisi scelerisque libero posuere efficitur et rhoncus velit. Donec eu leo accumsan, dapibus turpis at, convallis tortor.',
        },
        {
            questionerDTO: {
                username: 'username1',
                picture: car1,
                id: 3,
            },
            date: '2021-10-10',
            question:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non posuere ligula. Morbi et tortor ut leo pulvinar posuere. Vivamus lorem eros, placerat eu ex eget, maximus ultrices massa.',
            answer: 'Maecenas at nisi scelerisque libero posuere efficitur et rhoncus velit. Donec eu leo accumsan, dapibus turpis at, convallis tortor.',
        },
        {
            questionerDTO: {
                username: 'username2',
                picture: car1,
                id: 9,
            },
            date: '2021-10-10',
            question:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non posuere ligula. Morbi et tortor ut leo pulvinar posuere. Vivamus lorem eros, placerat eu ex eget, maximus ultrices massa.',
        },
        {
            questionerDTO: {
                username: 'username3',
                picture: car1,
                id: 5,
            },
            date: '2021-10-10',
            question:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non posuere ligula. Morbi et tortor ut leo pulvinar posuere. Vivamus lorem eros, placerat eu ex eget, maximus ultrices massa.',
        },
    ];

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

            {questions.map((question, index) => (
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
