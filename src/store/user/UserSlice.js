import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        userId: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.id;
        },
        removeUser: (state) => {
            state.token = null;
            state.userId = null;
        },
    },
});


export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
