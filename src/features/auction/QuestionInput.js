import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import colors from '../../utils/desgin/Colors';
import { usePostQuestionMutation } from '../../store/auction/questionsAndAnswersApi';

export function QuestionInput({ auctionId, authenticatedUserId, ownerId }) {
    const [question, setQuestion] = useState('');
    const [makeQuestion, { data, isError, error }] = usePostQuestionMutation();

    if (authenticatedUserId === ownerId) {
        return null;
    }

    const handleSendQuestion = () => {
        const body = {
            question: question,
            auctionId: auctionId,
        };
        makeQuestion(body);

        if (isError) {
            console.log(error);
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendQuestion();
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
                width: '100%',
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 650 }}>
                Make a question
            </Typography>

            <form onKeyDown={handleKeyPress}>
                <TextField
                    label="Make a question to the owner"
                    variant="standard"
                    sx={{
                        width: '100%',
                    }}
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                />
            </form>

            <Button
                variant="contained"
                style={{
                    backgroundColor: colors.water_green,
                    color: 'white',
                    width: '15%',
                    marginTop: '15px',
                }}
                onClick={() => {
                    handleSendQuestion();
                }}
            >
                Send
            </Button>
        </div>
    );
}
