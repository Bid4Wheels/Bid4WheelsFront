import { isRejectedWithValue } from '@reduxjs/toolkit';
import { addError } from './errorSlice';

export const rtkQueryErrorLogger = (store) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        store.dispatch(addError(action.payload.data));
    }

    return next(action);
};
