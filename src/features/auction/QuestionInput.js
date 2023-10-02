import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import colors from '../../utils/desgin/Colors';

export function QuestionInput({ auctionId, authenticatedUserId, ownerId }) {
    const [question, setQuestion] = useState('');

    if (authenticatedUserId === ownerId) {
        return null;
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
                    setQuestion('');
                }}
            >
                Send
            </Button>
        </div>
    );
}
