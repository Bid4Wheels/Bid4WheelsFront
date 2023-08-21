import { Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { EditProfileModal } from './editProfile';

export function ProfileTest() {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <div>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Button variant="contained" onClick={handleOpenModal}>
                    Edit
                </Button>
                <EditProfileModal open={openModal} onClose={handleCloseModal}></EditProfileModal>
            </Box>
        </div>
    );
}
