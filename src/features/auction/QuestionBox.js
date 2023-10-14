import React, { useState } from 'react';
import { Avatar, Typography, Button, TextField } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import { ReplyInput } from './ReplyInput';
import { QuestionDeleteModal } from './QuestionDeleteModal';

export function QuestionBox({ question, authenticatedUserId, ownerId, auctionId }) {
    const questioner = question.user;
    const reply = question.answer;
    const questionText = question.question;
    const questionDate = question.questionDate;
    const answerDate = question.answerDate;
    const isQuestioner = questioner.id === authenticatedUserId;
    const isOwner = ownerId === authenticatedUserId;
    const [ownerReply, setOwnerReply] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleReply = () => {
        setIsReplying(true);
    };

    const handleSendReply = () => {
        setIsReplying(false);
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
                                onClick={handleOpenDeleteModal}
                            >
                                Delete Question
                            </Button>
                        )}
                        <QuestionDeleteModal
                            open={openDeleteModal}
                            onClose={handleCloseDeleteModal}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
