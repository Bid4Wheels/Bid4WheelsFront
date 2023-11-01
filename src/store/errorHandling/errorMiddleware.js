import { isRejectedWithValue } from '@reduxjs/toolkit';
import { addError } from './errorSlice';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (store) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        console.warn('We got a rejected action!');
        console.warn(action.payload.data);
        store.dispatch(addError(action.payload.data));
    }

    return next(action);
};
