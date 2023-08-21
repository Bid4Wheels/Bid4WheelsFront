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
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export function EditProfileModal({ open, onClose }) {
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
                        {uploadImage()}
                        {formToComplete({ userInfo, setUserInfo })}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

function formToComplete({ userInfo, setUserInfo }) {
    const handleConfirmButton = () => {
        if (validatePhone(userInfo.phone)) {
            //complete with what we want to do
            console.log('si');
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

    const validatePhone = (phone) => {
        const phonePattern = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
        if (phonePattern.test(phone) && (phone.length === 10 || phone.length === 14)) {
            return true;
        }
    };

    return (
        <Box>
            <form>
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
                    type="text"
                    margin="normal"
                    variant="standard"
                    fullWidth
                    onChange={handlePhoneChange}
                    value={userInfo.phone}
                />
            </form>
            <Stack spacing={2} direction="row" marginTop={4}>
                <Button
                    variant="contained"
                    sx={{
                        width: '110px',
                        height: '50px',
                        backgroundColor: '#00d591',
                        '&:hover': { backgroundColor: '#009f76' },
                    }}
                    onClick={handleConfirmButton}
                >
                    CONFIRM
                </Button>
                <Button
                    variant="outlined"
                    sx={{ color: '#00d591', '&:hover': { color: '#009f76' } }}
                >
                    CHANGE PASSWORD
                </Button>
            </Stack>
        </Box>
    );
}

function uploadImage() {
    return (
        <Box marginRight={5} marginLeft={6}>
            <Avatar sx={{ width: 150, height: 150, marginBottom: 2 }}></Avatar>
            <Button
                variant="contained"
                component="label"
                sx={{ backgroundColor: '#00d591', '&:hover': { backgroundColor: '#009f76' } }}
            >
                Upload Image
                <input type="file" accept="image/*" hidden />
            </Button>
        </Box>
    );
}
