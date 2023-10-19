import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../utils/desgin/Theme';

export function ResponseDeleteModal({ open, onClose, questionId }) {
    const handleModalClose = () => {
        onClose();
    };

    const handleDelete = () => {
        // deleteResponse(questionId);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
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
                    backgroundColor: '#fff',
                    width: '600px',
                    height: '261px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <CloseIcon
                        sx={{
                            opacity: '50%',
                            position: 'relative',
                            top: '5px',
                            left: '280px',
                            cursor: 'pointer',
                            '&:hover': {
                                opacity: '100%',
                            },
                        }}
                        onClick={handleModalClose}
                    />
                </Box>
                <Typography fontSize={theme.typography.Large} fontWeight="bold">
                    Delete response?
                </Typography>
                <Typography fontSize={theme.typography.SemiSmall} marginBottom={5}>
                    Deleting the response will not delete the question.
                </Typography>
                <Box marginBottom={5}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#FC4141',
                            '&:hover': {
                                backgroundColor: '#fc2b2b',
                            },
                            marginRight: '20px',
                            borderRadius: '3px',
                            width: '100px',
                            height: '48px',
                        }}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'grey',
                            '&:hover': {
                                backgroundColor: 'grey',
                            },
                            width: '100px',
                            height: '48px',
                        }}
                        onClick={handleModalClose}
                    >
                        Go Back
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
