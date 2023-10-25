// ErrorSnackbar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { errorSelector, removeError } from '../../store/errorHandling/errorSlice';
import { IconButton, Snackbar, SnackbarContent } from '@mui/material';

const ErrorSnackbar = () => {
    const dispatch = useDispatch();
    const errorList = useSelector(errorSelector);

    const handleClose = (error) => {
        dispatch(removeError(error));
    };

    console.log(errorList);

    return (
        <div>
            {errorList.errorList.map((error, index) => (
                <Snackbar
                    key={index}
                    open={true} // Controlar la apertura de Snackbar aquí
                    autoHideDuration={5000} // Tiempo que se mostrará el error
                    onClose={() => handleClose(error)}
                >
                    <SnackbarContent
                        message={error}
                        action={
                            <IconButton color="inherit" onClick={() => handleClose(error)}>
                                <CloseIcon />
                            </IconButton>
                        }
                    />
                </Snackbar>
            ))}
        </div>
    );
};

export default ErrorSnackbar;
