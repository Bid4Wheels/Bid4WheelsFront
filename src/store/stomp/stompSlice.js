import { createSlice } from '@reduxjs/toolkit';

const stompSlice = createSlice({
    name: 'stomp',
    initialState: {
        bids: [],
    },
    reducers: {
        addBid: (state, action) => {
            state.messages.push(action.payload);
        },
        clearBid: (state) => {
            state.messages = [];
        },
    },
});

export const { addBid } = stompSlice.actions;
export const clearBids = stompSlice.actions.clearBid;
export const stompReducer = stompSlice.reducer;

// An action to start stomp connection.
export const connectStomp = (auctionId) => ({ type: 'connect', payload: auctionId });
// An action to stop stomp connection.
export const disconnectStomp = () => ({ type: 'disconnect' });
