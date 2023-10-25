import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: 'error',
    initialState: {
        errorList: [],
    },
    reducers: {
        addError: (state, action) => {
            state.errorList.push(action.payload);
        },
        removeError: (state, action) => {
            state.errorList = state.errorList.filter((error) => error !== action.payload);
        },
    },
});

export const { addError, removeError } = errorSlice.actions;
export const errorSelector = (state) => state.errorList;
export default errorSlice.reducer;
