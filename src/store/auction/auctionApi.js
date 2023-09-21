import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { baseUrl } from '../../features/commons/Constants';

export const auctionApi = createApi({
    reducerPath: 'auctionApi',
    baseQuery: createBaseQuery(`${baseUrl}/auction`),
    endpoints: (builder) => ({
        getAuctionById: builder.query({
            query: (id) => `/${id}`,
        }),
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
        createAuction: builder.mutation({
            query: (body) => ({
                url: '',
                method: 'POST',
                body: body,
            }),
        }),
        getImageLinks: builder.mutation({
            query: (auctionId) => ({
                url: `/image-url/${auctionId}`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetAuctionByIdQuery,
    useGetFilteredAuctionsMutation,
    useGetAuctionListQuery,
    useCreateAuctionMutation,
    useGetImageLinksMutation,
} = auctionApi;
