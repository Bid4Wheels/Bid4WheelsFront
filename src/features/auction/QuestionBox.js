import React, { useState } from 'react';
import { Avatar, Typography, Button, TextField } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import { ReplyInput } from './ReplyInput';
import { EditAnswerInput } from './EditAnswerInput';

export function QuestionBox({
    question,
    authenticatedUserId,
    ownerId,
    auctionId,
    isAuctionOver,
    refetch,
}) {
    const questionId = question.question.id;
    const questioner = question.question.user;
    const reply = question.answer.answer;
    const questionText = question.question.question;
    const questionDate = question.question.timeOfQuestion;
    const answerDate = question.answer.timeOfAnswer;
    const isQuestioner = questioner.id === authenticatedUserId;
    const isOwner = ownerId === authenticatedUserId;
    const [ownerReply, setOwnerReply] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [isEditingAnswer, setIsEditingAnswer] = useState(false);

    const handleReply = () => {
        setIsReplying(true);
    };

    const handleSendReply = () => {
        setIsReplying(false);
    };
    const handleOpenEditAnswer = () => {
        setIsEditingAnswer(true);
    };
    const handleCloseEditAnswer = () => {
        return setIsEditingAnswer(false);
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
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex' }}>
                    <Avatar
                        src={questioner.imgURL === 'default' ? null : questioner.imgURL}
                        sx={{ width: 65, height: 65, mr: '10px', mt: '10px' }}
                    ></Avatar>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography sx={{ fontSize: '22px', fontWeight: 480 }}>
                                {questioner.name + ' ' + questioner.lastName}
                            </Typography>

                            {isQuestioner && (
                                <Typography
                                    sx={{
                                        color: colors.water_green,
                                        fontSize: '22px',
                                        fontWeight: 480,
                                        ml: '5px',
                                    }}
                                >
                                    (You)
                                </Typography>
                            )}
                        </div>
                        <Typography sx={{ fontSize: '14px', color: '#9C9C9C' }}>
                            {questionDate}
                        </Typography>
                        <Typography sx={{}}>{questionText}</Typography>
                        {reply && (
                            <div
                                style={{
                                    border: `1px solid ${colors.water_green}`,
                                    borderRadius: '10px',
                                    padding: '10px',
                                    marginTop: '10px',
                                }}
                            >
                                <Typography sx={{ color: colors.water_green, fontWeight: 650 }}>
                                    Reply from owner:
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: '#9C9C9C' }}>
                                    {answerDate}
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: '#8c8c8c' }}>
                                    {reply}
                                </Typography>
                                {isOwner && (
                                    <div>
                                        <Button
                                            variant="contained"
                                            style={{
                                                backgroundColor: colors.water_green,
                                                color: 'white',
                                                marginTop: '10px',
                                                marginRight: '10px',
                                                width: '80px',
                                                padding: '5px',
                                            }}
                                            onClick={handleOpenEditAnswer}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            style={{
                                                backgroundColor: '#FC4141',
                                                color: 'white',
                                                width: '80px',
                                                marginTop: '10px',
                                                padding: '5px',
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                        {isOwner && isEditingAnswer && !isAuctionOver && (
                            <EditAnswerInput
                                answerText={reply}
                                handleClose={handleCloseEditAnswer}
                                questionId={questionId}
                                refetch={refetch}
                            />
                        )}
                        {isOwner && !reply && !isReplying && (
                            <ReplyInput authenticatedUserId={authenticatedUserId} />
                        )}
                        {isQuestioner && !reply && (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#FC4141',
                                    color: 'white',
                                    mt: '10px',
                                    width: '140px',
                                    p: '5px',
                                    '&:hover': {
                                        backgroundColor: '#fc2b2b',
                                    },
                                }}
                            >
                                Delete Question
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
