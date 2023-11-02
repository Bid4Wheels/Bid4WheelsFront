import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import colors from '../../utils/desgin/Colors';
import { usePostQuestionMutation } from '../../store/auction/questionsAndAnswersApi';
import { showMessage } from '../../store/success/successSlice';
import { useDispatch } from 'react-redux';

export function QuestionInput({ auctionId, authenticatedUserId, ownerId }) {
    const [question, setQuestion] = useState('');
    const [makeQuestion, { data, isError, error }] = usePostQuestionMutation();
    const dispatch = useDispatch();

    if (authenticatedUserId === ownerId) {
        return null;
    }

    const handleSendQuestion = () => {
        const body = {
            question: question,
            auctionId: auctionId,
        };
        makeQuestion(body);
        dispatch(showMessage('Question sent'));

        if (isError) {
            console.log(error);
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

            <TextField
                label="Make a question to the owner"
                variant="standard"
                sx={{
                    width: '100%',
                }}
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
            />

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
