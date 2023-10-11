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
                // eslint-disable-next-line no-debugger
                debugger;
                if (responseData.page > 0) {
                    currentCacheData.content.push(...responseData.content);
                    return currentCacheData;
                }
                return responseData;
            },
            transformResponse: (response) => {
                return { content: response.content, last: response.last, page: response.number };
            },
            providesTags: ['AuctionList'],
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
                if (responseData.page > 0) {
                    currentCacheData.content.push(...responseData.content);
                    return currentCacheData;
                }
                return responseData;
            },
            transformResponse: (response) => {
                return { content: response.content, last: response.last, page: response.number };
            },
            providesTags: ['AuctionList'],
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
            providesTags: ['AuctionList'],
        }),
        createAuction: builder.mutation({
            query: (body) => ({
                url: '',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['AuctionList', 'tags', 'userAuctions'],
        }),
        getImageLinks: builder.mutation({
            query: (auctionId) => ({
                url: `/image-url/${auctionId}`,
                method: 'POST',
            }),
        }),
        getAuctionsByUserId: builder.query({
            query: (userId) => `/user/${userId}`,
            providesTags: ['userAuctions'],
        }),
        getAuctionsByBidderId: builder.query({
            query: (userId) => `/bidder/${userId}`,
            providesTags: ['userAuctions'],
        }),
        deleteAuction: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AuctionList', 'userAuctions'],
        }),
    }),
});

export const {
    useGetAuctionByIdQuery,
    useGetFilteredAuctionsMutation,
    useGetAuctionListQuery,
    useCreateAuctionMutation,
    useGetImageLinksMutation,
    useGetAuctionsByUserIdQuery,
    useDeleteAuctionMutation,
    useGetNewAuctionListQuery,
    useGetEndingAuctionListQuery,
    useGetAuctionsByBidderIdQuery,
} = auctionApi;
