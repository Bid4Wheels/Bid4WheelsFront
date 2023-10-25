import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { errorSelector, removeError } from '../../store/errorHandling/errorSlice';
import { Snackbar, Alert, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ErrorSnackbar = () => {
    const dispatch = useDispatch();
    const errorList = useSelector(errorSelector).errorList;

    console.log(errorList);

    const handleClose = (id) => {
        dispatch(removeError(id));
    };

    const TransitionUp = (props) => {
        return <Slide {...props} direction="up" />;
    };

    return (
        <div>
            {errorList &&
                errorList.map((error) => (
                    <Snackbar
                        key={error.id}
                        open={true}
                        autoHideDuration={4000}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        TransitionComponent={TransitionUp}
                        onClose={() => handleClose(error.id)}
                    >
                        <Alert
                            severity="error"
                            action={
                                <React.Fragment>
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        sx={{ p: 0.5 }}
                                        onClick={() => handleClose(error.id)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </React.Fragment>
                            }
                        >
                            {error.message}
                        </Alert>
                    </Snackbar>
                ))}
        </div>
    );
};

export default ErrorSnackbar;
