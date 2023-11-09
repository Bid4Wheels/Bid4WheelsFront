// successSnackbarReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: null,
};

const successSnackbarSlice = createSlice({
    name: 'successSnackbar',
    initialState,
    reducers: {
        showMessage: (state, action) => {
            state.message = action.payload;
        },
        hideMessage: (state) => {
            state.message = null;
        },
    },
});

export const { showMessage, hideMessage } = successSnackbarSlice.actions;
export default successSnackbarSlice.reducer;
