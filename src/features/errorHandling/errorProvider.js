import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addError } from '../../store/errorHandling/errorSlice';

const ErrorContext = React.createContext();

export const useError = () => {
    return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
    const dispatch = useDispatch();

    const notifyError = (errorMessage) => {
        const error = {
            id: new Date().getTime(),
            message: errorMessage,
        };

        dispatch(addError(error));
    };

    return (
        <ErrorContext.Provider value={{ notifyError }}>
            <div>{children}</div>
        </ErrorContext.Provider>
    );
};
