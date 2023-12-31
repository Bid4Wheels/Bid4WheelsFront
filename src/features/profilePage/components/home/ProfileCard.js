import React, { useState } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Button, Box, Typography, Avatar, Rating } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';
import { EditProfileModal } from './EditProfile';
import { DeleteAccountModal } from './DeleteProfile';

export const ProfileCard = ({
    canEdit,
    Username,
    Email,
    Phone,
    imgUrl,
    UserId,
    Name,
    Surname,
    ReviewValue,
    refetchUserData,
}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 12,
                border: '3px solid',
                borderColor: colors.water_green,
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '25px',
                width: '90%',
            }}
        >
            <Avatar
                src={imgUrl === 'default' ? null : imgUrl}
                sx={{ width: 200, height: 200, marginBottom: '10px' }}
            ></Avatar>
            <Typography
                variant="h4"
                sx={{
                    color: 'black',
                    fontSize: theme.typography.XxLarge.fontSize,
                    fontWeight: 500,
                    letterSpacing: 0.46,
                    textAlign: 'center',
                    marginTop: 2,
                }}
            >
                {Username}
            </Typography>
            <Rating
                precision={0.5}
                value={ReviewValue}
                sx={{
                    '& .MuiRating-iconFilled': {
                        color: colors.water_green,
                    },
                }}
                readOnly
            ></Rating>
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
                <>
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
                            padding: '3.5%',
                        }}
                        onClick={handleOpenEditModal}
                    >
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: theme.typography.Small.fontSize,
                                fontWeight: 500,
                                letterSpacing: '0.4px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Edit
                        </Typography>
                        <EditIcon style={{ color: 'white' }} />
                    </Button>
                    <EditProfileModal
                        open={openEditModal}
                        onClose={handleCloseEditModal}
                        imgUrl={imgUrl}
                        refetchUserData={refetchUserData}
                        userName={Name}
                        lastName={Surname}
                        email={Email}
                        phone={Phone}
                        userId={UserId}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        style={{
                            height: '50px',
                            backgroundColor: '#FC4141',
                            marginTop: '1%',
                        }}
                        onClick={handleOpenDeleteModal}
                    >
                        DELETE ACCOUNT
                    </Button>
                    <DeleteAccountModal
                        open={openDeleteModal}
                        onClose={handleCloseDeleteModal}
                        userId={UserId}
                    />
                </>
            )}
        </Box>
    );
};
