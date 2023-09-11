import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        userId: null,
        userEmail: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.id;
            state.userEmail = action.payload.email;
        },
        removeUser: (state) => {
            state.token = null;
            state.userId = null;
            state.userEmail = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
