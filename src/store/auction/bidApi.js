import { authenticatedApi } from '../mainApis/authenticatedApi';

export const bidApi = authenticatedApi.injectEndpoints({
    reducerPath: 'bidApi',
    endpoints: (builder) => ({
        bid: builder.mutation({
            query: ({ amount, userId, auctionId }) => ({
                url: '/bid',
                method: 'POST',
                body: { amount, userId, auctionId },
            }),
            invalidatesTags: ['Auction'],
        }),
    }),
});

export const { useBidMutation } = bidApi;
