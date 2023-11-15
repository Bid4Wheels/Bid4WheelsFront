import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: 'errorList',
    initialState: {
        errorList: [],
    },
    reducers: {
        addError: (state, action) => {
            state.errorList.push({ id: new Date().getTime(), message: action.payload });
        },
        removeError: (state, action) => {
            state.errorList = state.errorList.filter((error) => error.id !== action.payload);
        },
    },
});

export const { addError, removeError } = errorSlice.actions;
export const errorSelector = (state) => state.errorList;
export default errorSlice.reducer;
