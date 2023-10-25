import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { errorSelector, removeError } from '../../store/errorHandling/errorSlice';
import { Snackbar, Alert, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ErrorSnackbar = () => {
    const dispatch = useDispatch();
    const errorList = useSelector(errorSelector).errorList;

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
                            sx={{
                                borderRadius: '25px',
                                alignContent: 'center',
                                alignItems: 'center',
                                '.MuiAlert-action': {
                                    padding: '0px',
                                    paddingLeft: '2px',
                                },
                            }}
                            action={
                                <React.Fragment>
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        onClick={() => handleClose(error.id)}
                                        sx={{ p: 0.5 }}
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
