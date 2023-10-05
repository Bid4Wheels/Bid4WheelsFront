import React from 'react';
import { QuestionInput } from './QuestionInput';

export function QuestionsContainer({ auctionId, authenticatedUserId, ownerId }) {
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
        </div>
    );
}
