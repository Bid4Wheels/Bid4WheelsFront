import React, { useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import DeleteAuction from '../commons/DeleteAuction.png';
import CloseIcon from '@mui/icons-material/Close';

export function DangerZone({ title }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Box
            sx={{
                height: '300px',
                width: '70%',
                border: `1px solid ${colors.red} `,
                margin: 'auto',
                marginBottom: '25px',
                borderRadius: '10px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#FC4141' }}>
                Danger Zone
            </Typography>
            <Typography variant="h6" sx={{}}>
                Delete auction? Once you do there&apos;s no way to get it back
            </Typography>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#FC4141',
                    color: 'white',
                    marginTop: '20px',
                    width: '100px',
                    p: '10px',
                    '&:hover': {
                        backgroundColor: '#fc2b2b',
                    },
                }}
                onClick={handleModalOpen}
            >
                Delete
            </Button>
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
                        height: '400px',
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
                    <img
                        src={DeleteAuction}
                        alt="Delete Auction"
                        style={{
                            width: '80%',
                            height: '80%',
                            objectFit: 'contain',
                        }}
                    />
                    <Typography sx={{ fontSize: '25px', fontWeight: 660 }}>
                        Confirm deletion
                    </Typography>
                    <Typography sx={{ fontSize: '15px' }}>
                        Please confirm if you want to delete this auction
                    </Typography>
                    <Typography sx={{ mb: '15px', fontWeight: 620 }}>{title}</Typography>
                    <Box sx={{ mb: '20px' }}>
                        <Button
                            variant="contained"
                            onClick={handleModalClose}
                            style={{ backgroundColor: 'grey', marginRight: '10px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#FC4141',
                                '&:hover': {
                                    backgroundColor: '#fc2b2b',
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
