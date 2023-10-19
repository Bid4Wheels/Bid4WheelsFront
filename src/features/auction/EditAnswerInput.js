import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import { useAnswerQuestionMutation } from '../../store/auction/questionsAndAnswersApi';
export const EditAnswerInput = ({ answerText, handleClose, questionId, refetch }) => {
    const initialState = {
        answer: answerText || '',
    };
    const [answer, setAnswer] = useState(initialState);
    const [isConfirmButtonEnabled, setIsConfirmButtonEnabled] = useState(false);
    const [updateAnswer] = useAnswerQuestionMutation();
    useEffect(() => {
        setAnswer(answerText);
    }, [answerText]);
    useEffect(() => {
        if (answer.length === 0 || answer === answerText) {
            setIsConfirmButtonEnabled(false);
        } else {
            setIsConfirmButtonEnabled(true);
        }
    }, [answer]);
    function handleCloseEdit() {
        handleClose();
    }

    async function handleSend() {
        const body = {
            id: questionId,
            answer: {
                answer: answer,
            },
        };
        await updateAnswer(body);
        refetch();
        handleCloseEdit();
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: '10px',
                marginTop: '10px',
            }}
        >
            <TextField
                variant="standard"
                sx={{
                    width: '95%',
                }}
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                InputProps={{
                    style: {
                        fontSize: '14px',
                        color: '#8c8c8c',
                    },
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: isConfirmButtonEnabled ? colors.water_green : colors.grey,
                        color: 'white',
                        width: '80px',
                        marginTop: '15px',
                        marginRight: '10px',
                    }}
                    disabled={!isConfirmButtonEnabled}
                    onClick={handleSend}
                >
                    Confirm
                </Button>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#FC4141',
                        color: 'white',
                        width: '80px',
                        marginTop: '15px',
                    }}
                    onClick={handleCloseEdit}
                >
                    Cancel
                </Button>
            </Box>
        </div>
    );
};
