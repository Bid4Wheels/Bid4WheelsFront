import React, { useState } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Button, Box, Typography, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';
import { EditProfileModal } from './EditProfile';

export const ProfileCard = ({ canEdit, Username, Email, Phone }) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    return (
        <Box
            sx={{
                paddingLeft: '50px',
                paddingRight: '50px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 12,
                border: '3px solid',
                borderColor: colors.water_green,
                background: 'white',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Avatar sx={{ width: 274, height: 274, marginBottom: 2 }}></Avatar>
            <Typography
                variant="h4"
                sx={{
                    color: 'black',
                    fontSize: theme.typography.XxLarge.fontSize,
                    fontWeight: 500,
                    lineHeight: '26px',
                    letterSpacing: 0.46,
                    marginTop: 2,
                    marginBottom: 2,
                }}
            >
                {Username}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    overflow: 'auto',
                    marginBottom: 1,
                }}
            >
                <MailIcon />
                <Typography
                    variant="body1"
                    sx={{
                        color: 'black',
                        fontSize: theme.typography.Medium.fontSize,
                        textDecoration: 'underline',
                    }}
                >
                    {Email}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    overflow: 'auto',
                }}
            >
                <PhoneIcon />
                <Typography
                    variant="body1"
                    sx={{
                        color: 'black',
                        fontSize: theme.typography.Medium.fontSize,
                    }}
                >
                    {Phone}
                </Typography>
            </Box>
            {canEdit && (
                <Button
                    className="EditButton"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                        backgroundColor: colors.water_green,
                        boxShadow: theme.shadows[3],
                        border: 'none',
                        marginTop: 2,
                    }}
                >
                    <Button
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& .EditText': {
                                color: 'white',
                                fontSize: theme.typography.Small.fontSize,
                                fontWeight: 500,
                                letterSpacing: '0.4px',
                                textTransform: 'uppercase',
                            },
                        }}
                        onClick={handleOpenEditModal}
                    >
                        <div className="EditText">Edit</div>
                        <EditIcon style={{ color: 'white' }} />
                    </Button>
                    <EditProfileModal open={openEditModal} onClose={handleCloseEditModal} />
                </Button>
            )}
        </Box>
    );
};
