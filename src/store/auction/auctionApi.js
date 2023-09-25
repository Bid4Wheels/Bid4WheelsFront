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
        getNewAuctionList: builder.query({
            query: (page, size) => ({ url: '/new', params: { page, size } }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge(currentCacheData, responseData) {
                if (responseData.page > 1) {
                    currentCacheData.content.push(...responseData.content);
                    return currentCacheData;
                }
                return responseData;
            },
            transformResponse: (response) => {
                return { content: response.content, last: response.last };
            },
        }),
        getEndingAuctionList: builder.query({
            query: (page, size) => ({ url: '/ending', params: { page, size } }),
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge(currentCacheData, responseData) {
                if (responseData.page > 1) {
                    currentCacheData.content.push(...responseData.content);
                    return currentCacheData;
                }
                return responseData;
            },
            transformResponse: (response) => {
                return { content: response.content, last: response.last };
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
        deleteAuction: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAuctionByIdQuery,
    useGetFilteredAuctionsMutation,
    useGetAuctionListQuery,
    useDeleteAuctionMutation,
    useGetNewAuctionListQuery,
    useGetEndingAuctionListQuery,
} = auctionApi;
