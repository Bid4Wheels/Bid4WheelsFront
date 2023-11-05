import { createSlice } from '@reduxjs/toolkit';

const winningAuctionSlice = createSlice({
    name: 'winningAuction',
    initialState: null,
    reducers: {
        updateWinningAuction: (state, action) => {
            return action.payload;
        },
        removeWinningAuction: (state) => {
            return null; // Reset the state to null
        },
    },
});

export const { updateWinningAuction, removeWinningAuction } = winningAuctionSlice.actions;
export default winningAuctionSlice.reducer;

export const selectWinningAuction = (state) => state.winningAuction;
export const selectHasValidValue = (state) => !!state.winningAuction;
