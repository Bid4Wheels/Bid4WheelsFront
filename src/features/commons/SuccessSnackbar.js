import React from 'react';
import { useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { hideMessage } from '../../store/success/successSlice';

export function SuccessSnackbar() {
    const message = useSelector((state) => state.successSnackbar.message);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(hideMessage());
    };

    return (
        <Snackbar open={message !== null} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
