import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../../../utils/desgin/Theme';

import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from '../../../../store/user/authenticatedUserApi';
import { removeUser } from '../../../../store/user/UserSlice';
import { useDispatch } from 'react-redux';

export function DeleteAccountModal({ open, onClose, userId, modalStyle }) {
    const handleCloseDeleteAccountModal = () => {
        onClose();
    };
    const nav = useNavigate();
    const [deleteAccount] = useDeleteUserMutation();
    const dispatch = useDispatch();
    const handleDeleteAccount = async () => {
        try {
            console.log('El valor de userId al cerrar la cuenta es:', userId);
            await deleteAccount(userId);
            dispatch(removeUser());
            nav('/login');
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
        }
    };
    console.log('El valor de userId al abrir el modal es:', userId);

    return (
        <div>
            <Modal open={open} onClose={onClose}>
                <Box sx={modalStyle}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ borderBottom: '2px solid black' }}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            component="h2"
                            marginLeft="8px"
                        >
                            Delete account
                        </Typography>
                        <IconButton aria-label="Close">
                            <CloseIcon onClick={handleCloseDeleteAccountModal} fontSize="large" />
                        </IconButton>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography
                            variant="h4"
                            sx={{
                                textAlign: 'center',
                                color: 'black',
                                fontSize: theme.typography.Medium.fontSize,
                                fontWeight: 500,
                                lineHeight: '30px',
                                letterSpacing: 0.46,
                                marginTop: 2,
                                marginBottom: 2,
                            }}
                        >
                            Are you sure you want to delete your account? This action is
                            irreversible and you will not be able to create another account with the
                            same mail.
                        </Typography>
                        <Button
                            variant="contained"
                            type="submit"
                            style={{
                                height: '50px',
                                backgroundColor: '#FC4141',
                                marginTop: '2%',
                                paddingLeft: '20%',
                                paddingRight: '20%',
                            }}
                            onClick={handleDeleteAccount}
                        >
                            Yes, I want to delete my account
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
