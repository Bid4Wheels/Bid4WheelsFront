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
            state.userId = action.payload.userId;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
