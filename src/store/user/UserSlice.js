import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        userId: null,
        userEmail: null,
        validatedCode: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.id;
            state.userEmail = action.payload.email;
            state.validatedCode = false;
        },
        removeUser: (state) => {
            state.token = null;
            state.userId = null;
            state.userEmail = null;
            state.validatedCode = false;
        },
        addEmail: (state, action) => {
            state.userEmail = action.payload.email;
        },
        addValidatedCode: (state, action) => {
            state.validatedCode = action.payload.code;
        },
    },
});

export const { setUser, removeUser, addEmail, addValidatedCode } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
