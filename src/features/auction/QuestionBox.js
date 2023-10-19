import React, { useState } from 'react';
import { Avatar, Typography, Button, TextField, Modal, Box } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import { ReplyInput } from './ReplyInput';
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteQuestionMutation } from '../../store/auction/questionsAndAnswersApi';
import { ResponseDeleteModal } from './ResponseDeleteModal';

export function QuestionBox({
    question,
    authenticatedUserId,
    ownerId,
    auctionId,
    isAuctionClosed,
}) {
    const questioner = question.question.user;
    const id = question.question.id;
    const reply = question.answer.answer;
    const questionText = question.question.question;
    const questionDate = question.question.timeOfQuestion;
    const answerDate = question.answer.timeOfAnswer;
    const questionId = question.question.id;
    const isQuestioner = questioner.id === authenticatedUserId;
    const isOwner = ownerId === authenticatedUserId;
    const [ownerReply, setOwnerReply] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [openDeleteResponseModal, setOpenDeleteResponseModal] = useState(false);
    const handleOpenDeleteResponseModal = () => setOpenDeleteResponseModal(true);
    const handleCloseDeleteResponseModal = () => setOpenDeleteResponseModal(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteQuestion, { isSuccess }] = useDeleteQuestionMutation();

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        deleteQuestion(questionId);
        handleModalClose();
    };

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
                                            onClick={handleOpenDeleteResponseModal}
                                        >
                                            Delete
                                        </Button>
                                        <ResponseDeleteModal
                                            open={openDeleteResponseModal}
                                            onClose={handleCloseDeleteResponseModal}
                                            questionId={id}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        {isOwner && !reply && !isReplying && (
                            <ReplyInput authenticatedUserId={authenticatedUserId} id={id} />
                        )}
                        {!isAuctionClosed && isQuestioner && !reply && (
                            <div>
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
                                    onClick={handleModalOpen}
                                >
                                    Delete Question
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        borderRadius: '10px',
                        backgroundColor: '#fff',
                        width: '400px',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <CloseIcon
                        sx={{
                            opacity: '50%',
                            position: 'relative',
                            left: '180px',
                            cursor: 'pointer',
                            mt: '7px',
                            '&:hover': {
                                opacity: '100%',
                            },
                        }}
                        onClick={handleModalClose}
                    />
                    <Typography sx={{ fontSize: '25px', fontWeight: 660 }}>
                        Delete Question?
                    </Typography>
                    <Typography sx={{ fontSize: '15px' }}>
                        Deleting the question will also delete the response
                    </Typography>
                    <Box sx={{ mb: '30px' }}>
                        <Button
                            variant="contained"
                            onClick={handleModalClose}
                            style={{ backgroundColor: 'grey', marginRight: '10px' }}
                        >
                            Go back
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#FC4141',
                                '&:hover': {
                                    backgroundColor: '#fc2b2b',
                                },
                            }}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
