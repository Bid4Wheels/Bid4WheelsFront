import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../features/commons/Constants';

export const cardApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/auction`,
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

export const { useGetAuctionListQuery, useGetFilteredAuctionsQuery } = cardApiSlice;
