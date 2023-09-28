import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { baseUrl } from '../../features/commons/Constants';

export const bidApi = createApi({
    reducerPath: 'bidApi',
    baseQuery: createBaseQuery(`${baseUrl}`),
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
