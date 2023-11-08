import React, { useState } from 'react';
import { Avatar, Typography, Button, Modal, Box } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import { ReplyInput } from './ReplyInput';
import { EditAnswerInput } from './EditAnswerInput';
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteQuestionMutation } from '../../store/auction/questionsAndAnswersApi';
import { ResponseDeleteModal } from './ResponseDeleteModal';
import { useNavigate } from 'react-router-dom';

export function QuestionBox({
    question,
    authenticatedUserId,
    ownerId,
    auctionId,
    isDeadlineFinished,
}) {
    const questioner = question.question.user;
    const id = question.question.id;
    const reply = question.answer.answer;
    const questionText = question.question.question;
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    };

    const questionDate = formatTime(question.question.timeOfQuestion);
    const answerDate = formatTime(question.answer.timeOfAnswer);
    const questionId = question.question.id;
    const isQuestioner = questioner.id === authenticatedUserId;
    const isOwner = ownerId === authenticatedUserId;
    const [isReplying, setIsReplying] = useState(false);
    const [isEditingAnswer, setIsEditingAnswer] = useState(false);
    const [openDeleteResponseModal, setOpenDeleteResponseModal] = useState(false);
    const handleOpenDeleteResponseModal = () => setOpenDeleteResponseModal(true);
    const handleCloseDeleteResponseModal = () => setOpenDeleteResponseModal(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteQuestion, { isSuccess }] = useDeleteQuestionMutation();
    const navigate = useNavigate();

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

    const handleUserPageRedirect = () => {
        if (questioner) {
            navigate(`/user/${questioner.id}`);
        } else {
            navigate(`*`);
        }
    };

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
                        sx={{ width: 65, height: 65, mr: '10px', mt: '10px', cursor: 'pointer' }}
                        onClick={() => handleUserPageRedirect()}
                    ></Avatar>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                sx={{
                                    fontSize: '22px',
                                    fontWeight: 480,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                                onClick={() => handleUserPageRedirect()}
                            >
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
                                {isOwner && isDeadlineFinished && (
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
                        {isOwner && isEditingAnswer && isDeadlineFinished && (
                            <EditAnswerInput
                                answerText={reply}
                                handleClose={handleCloseEditAnswer}
                                questionId={questionId}
                            />
                        )}
                        {isOwner && !reply && !isReplying && (
                            <ReplyInput
                                authenticatedUserId={authenticatedUserId}
                                id={id}
                                isDeadlineFinished={isDeadlineFinished}
                            />
                        )}
                        {isQuestioner && !reply && isDeadlineFinished && (
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
