import {
    Avatar,
    Box,
    Button,
    IconButton,
    Modal,
    Stack,
    TextField,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import colors from '../../../../utils/desgin/Colors';
import {
    useGetUploadImageUrlQuery,
    useUpdateUserMutation,
} from '../../../../store/user/authenticatedUserApi';
import { validatePhoneNumber } from '../../../../utils/validationFunctions';
import { useNavigate } from 'react-router-dom';
import { useSendValidationCodeMutation } from '../../../../store/user/UserApi';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../../../store/user/UserSlice';
import { DeleteAccountModal } from './DeleteProfile';
import { resizeFile } from '../../../../utils/resize';
import { pushImage } from '../../../../utils/requests';
import { showMessage } from '../../../../store/success/successSlice';

export function EditProfileModal({
    open,
    onClose,
    imgUrl,
    refetchUserData,
    userName,
    lastName,
    email,
    phone,
    userId,
}) {
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
        name: userName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || '',
    };

    const [localImage, setLocalImage] = useState(null);

    const [userInfo, setUserInfo] = useState(initialState);
    useEffect(() => {
        setUserInfo({
            name: userName || '',
            lastName: lastName || '',
            email: email || '',
            phone: phone || '',
        });
    }, [userName, lastName, email, phone]);
    const handleCloseModal = () => {
        setUserInfo(initialState);
        setLocalImage(null);
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
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Box
                                marginRight={5}
                                marginLeft={6}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Avatar
                                    src={
                                        localImage
                                            ? URL.createObjectURL(localImage)
                                            : imgUrl === 'default'
                                            ? null
                                            : imgUrl
                                    }
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
                                        onChange={(e) => {
                                            setLocalImage(e.target.files[0]);
                                        }}
                                    />
                                </Button>
                            </Box>
                        </Box>
                        {formToComplete({
                            userInfo,
                            setUserInfo,
                            userId,
                            onClose,
                            localImage,
                            refetchUserData,
                        })}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

function formToComplete({ userInfo, setUserInfo, userId, onClose, localImage, refetchUserData }) {
    const [updateUser] = useUpdateUserMutation();
    const navigate = useNavigate();
    const { data: uploadUrl } = useGetUploadImageUrlQuery();
    const dispatch = useDispatch();

    function handleUploadImage(image, url) {
        return resizeFile(image, 500, 500).then((result) => pushImage(url, result));
    }

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
                if (localImage) {
                    await handleUploadImage(localImage, uploadUrl);
                    refetchUserData();
                }
                dispatch(showMessage('Profile updated successfully'));
                console.log('si');
                onClose();
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

    const [sendValidationCode, { isLoading }] = useSendValidationCodeMutation();

    const userData = useSelector(userSelector);

    function getEmail() {
        if (userData.userEmail !== null) {
            return userData.userEmail;
        }
    }

    const handleChangePasswordClick = async () => {
        const userEmail = getEmail();
        const payload = {
            email: userEmail,
        };
        try {
            await sendValidationCode(payload)
                .unwrap()
                .then(
                    () => {
                        navigate('/validateIdentity');
                    },
                    (err) => console.log(err),
                );
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) {
        return (
            <Grid container justifyContent="center" alignItems="center">
                <CircularProgress />
            </Grid>
        );
    }

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
                        style={{
                            color: colors.water_green,
                            borderColor: colors.water_green,
                            '&:hover': { color: colors.on_stand_water_green },
                        }}
                        onClick={handleChangePasswordClick}
                    >
                        CHANGE PASSWORD
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
