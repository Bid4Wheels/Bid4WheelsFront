import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

const tempUrl = 'api.bid4wheels.com';

export const cardApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://${tempUrl}/auction`,
    }),
    endpoints: (builder) => ({
        getAuctionList: builder.query({
            query: (page, size) => ({ url: '/', params: { page, size } }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
        }),
        getFilteredAuctions: builder.query({
            query: (page, size, filter) => ({ url: '/filter', params: { page, size, filter } }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
        }),
    }),
});

export const { useGetAuctionListQuery } = cardApiSlice;
