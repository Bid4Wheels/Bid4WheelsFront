import {
    Avatar,
    Box,
    Button,
    IconButton,
    Modal,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import colors from '../../../../utils/desgin/Colors';
import {
    useGetUploadImageUrlQuery,
    useUpdateUserMutation,
} from '../../../../store/user/authenticatedUserApi';
import { useParams } from 'react-router';
import { validatePhoneNumber } from '../../../../utils/validationFunctions';
import { useNavigate } from 'react-router-dom';

export function EditProfileModal({ open, onClose, imgUrl }) {
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

    const initialState = {
        name: '',
        lastName: '',
        email: '',
        phone: '',
    };

    const [userInfo, setUserInfo] = useState(initialState);
    const handleCloseModal = () => {
        setUserInfo(initialState);
        onClose();
    };

    return (
        <div>
            <Modal open={open} onClose={handleCloseModal}>
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
                            Edit profile
                        </Typography>
                        <IconButton aria-label="Close">
                            <CloseIcon onClick={handleCloseModal} fontSize="large" />
                        </IconButton>
                    </Box>
                    <Box display="flex" marginTop={'30px'} marginBottom={'30px'} marginRight={5}>
                        {uploadImage({ imgUrl })}
                        {formToComplete({ userInfo, setUserInfo })}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

function formToComplete({ userInfo, setUserInfo }) {
    const [updateUser] = useUpdateUserMutation();
    const userId = useParams().userId;
    const navigate = useNavigate();
    console.log(userId);
    const handleConfirmButton = async (event) => {
        event.preventDefault();
        if (
            validatePhoneNumber(userInfo.phone) &&
            validateName(userInfo.name) &&
            validateLastName(userInfo.lastName)
        ) {
            const updatedUser = {
                id: userId,
                userInfo: {
                    name: userInfo.name,
                    lastName: userInfo.lastName,
                    phoneNumber: userInfo.phone,
                },
            };
            try {
                await updateUser(updatedUser);
                console.log('si');
            } catch (error) {
                console.log(error);
            }
        } else {
            //complete with error message
            console.log('no');
        }
    };

    const handleNameChange = (event) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            name: event.target.value,
        }));
    };

    const handleLastNameChange = (event) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            lastName: event.target.value,
        }));
    };

    const handlePhoneChange = (event) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            phone: event.target.value,
        }));
    };

    const validateName = (name) => {
        return name !== '';
    };

    const validateLastName = (lastName) => {
        return lastName !== '';
    };

    return (
        <Box>
            <form onSubmit={(e) => handleConfirmButton(e)}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    margin="normal"
                    variant="standard"
                    fullWidth
                    value={userInfo.email}
                    disabled={true}
                />
                <Stack spacing={2} direction="row">
                    <TextField
                        label="Name"
                        name="Name"
                        type="text"
                        margin="normal"
                        variant="standard"
                        fullWidth
                        onChange={handleNameChange}
                        value={userInfo.name}
                    />
                    <TextField
                        label="Last name"
                        name="LastName"
                        type="text"
                        margin="normal"
                        variant="standard"
                        fullWidth
                        onChange={handleLastNameChange}
                        value={userInfo.lastName}
                    />
                </Stack>
                <TextField
                    label="Phone number"
                    name="PhoneNumber"
                    type="tel"
                    margin="normal"
                    variant="standard"
                    fullWidth
                    onChange={handlePhoneChange}
                    value={userInfo.phone}
                />
                <Stack spacing={2} direction="row" marginTop={4}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: '110px',
                            height: '50px',
                            backgroundColor: colors.water_green,
                            '&:hover': { backgroundColor: colors.on_stand_water_green },
                        }}
                    >
                        CONFIRM
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: colors.water_green,
                            '&:hover': { color: colors.on_stand_water_green },
                        }}
                        onClick={() => navigate('/changePassword')}
                    >
                        CHANGE PASSWORD
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}

function uploadImage({ imgUrl }) {
    const { data: uploadUrl, isLoading, isError } = useGetUploadImageUrlQuery();
    return (
        <Box marginRight={5} marginLeft={6}>
            <Avatar
                src={imgUrl === 'default' ? null : imgUrl}
                sx={{ width: 150, height: 150, marginBottom: 2 }}
            ></Avatar>
            <Button
                variant="contained"
                component="label"
                sx={{
                    backgroundColor: colors.water_green,
                    '&:hover': { backgroundColor: colors.on_stand_water_green },
                }}
            >
                Upload Image
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleUploadImage(e, uploadUrl)}
                />
            </Button>
            {!isLoading && !isError ? (
                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        backgroundColor: colors.water_green,
                        '&:hover': { backgroundColor: colors.on_stand_water_green },
                    }}
                >
                    {uploadUrl}
                </Button>
            ) : isLoading ? (
                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        backgroundColor: colors.water_green,
                        '&:hover': { backgroundColor: colors.on_stand_water_green },
                    }}
                >
                    isLoading
                </Button>
            ) : (
                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        backgroundColor: colors.water_green,
                        '&:hover': { backgroundColor: colors.on_stand_water_green },
                    }}
                >
                    Error
                </Button>
            )}
        </Box>
    );
}
function handleUploadImage(event, url) {
    const image = event.target.files[0];
    fetch(url, {
        method: 'PUT',
        body: image, // This is your file object
    })
        .then(
            (response) => response.json(), // if the response is a JSON object
        )
        .then(
            (success) => console.log(success), // Handle the success response object
        )
        .catch(
            (error) => console.log(error), // Handle the error response object
        );
}
