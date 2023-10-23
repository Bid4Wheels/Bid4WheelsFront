import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import colors from '../../utils/desgin/Colors';
import { usePostQuestionMutation } from '../../store/auction/questionsAndAnswersApi';
import { is } from 'date-fns/locale';
import { set } from 'date-fns';

export function QuestionInput({ auctionId, authenticatedUserId, ownerId }) {
    const [question, setQuestion] = useState('');
    const [makeQuestion, { data, isError, error }] = usePostQuestionMutation();

    if (authenticatedUserId === ownerId) {
        return null;
    }

    const isSendButtonDisabled = () => {
        if (question.length >= 10 && question.length <= 400) {
            return false;
        } else {
            return true;
        }
    };

    const handleSendQuestion = () => {
        const body = {
            question: question,
            auctionId: auctionId,
        };
        makeQuestion(body);
        setQuestion('');

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
                helperText={
                    isSendButtonDisabled() ? 'Question must be between 10 and 400 characters' : ''
                }
            />

            <Button
                variant="contained"
                style={{
                    backgroundColor: isSendButtonDisabled() ? 'grey' : colors.water_green,
                    color: 'white',
                    width: '15%',
                    marginTop: '10px',
                }}
                onClick={() => {
                    handleSendQuestion();
                }}
                disabled={isSendButtonDisabled()}
            >
                Send
            </Button>
        </div>
    );
}
