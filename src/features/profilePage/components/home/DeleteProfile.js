import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../../../utils/desgin/Theme';

import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from '../../../../store/user/authenticatedUserApi';
import { removeUser } from '../../../../store/user/UserSlice';
import { useDispatch } from 'react-redux';
import { addError } from '../../../../store/errorHandling/errorSlice';

export function DeleteAccountModal({ open, onClose, userId }) {
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
            dispatch(addError(error.data));
        }
    };
    const modalStyle = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 5,
        borderRadius: 3,
    };

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
                            Delete your account?
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
                                fontSize: theme.typography.SemiSmall.fontSize,
                                fontWeight: 500,
                                lineHeight: '30px',
                                letterSpacing: 0.46,
                                marginTop: 2,
                                marginBottom: 2,
                            }}
                        >
                            Are you sure? You will lose all of your auctions and bids. There is no
                            way to restore your account once it is deleted.
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Button
                                variant="contained"
                                type="submit"
                                style={{
                                    height: '50px',
                                    backgroundColor: '#FC4141',
                                    marginTop: '2%',
                                    marginRight: '5%',
                                    width: '120px',
                                }}
                                onClick={handleDeleteAccount}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                style={{
                                    height: '50px',
                                    backgroundColor: 'grey',
                                    marginTop: '2%',
                                    marginLeft: '5%',
                                    width: '120px',
                                }}
                                onClick={handleCloseDeleteAccountModal}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
