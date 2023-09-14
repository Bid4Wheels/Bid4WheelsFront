import { createApi } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../features/commons/Constants';
import { createBaseQuery } from '../baseQuery';

export const cardApiSlice = createApi({
    baseQuery: createBaseQuery(`${baseUrl}/auction`),
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
        getFilteredAuctions: builder.mutation({
            query: ({ filter, page, size }) => ({
                url: `/filter?page=${page}&size=${size}`,
                method: 'POST',
                body: filter,
            }),
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

export const { useGetAuctionListQuery, useGetFilteredAuctionsMutation } = cardApiSlice;
