import { authenticatedApi } from '../mainApis/authenticatedApi';

const baseUrl = '/auction';

export const auctionApi = authenticatedApi.injectEndpoints({
    reducerPath: 'auctionApi',
    endpoints: (builder) => ({
        getAuctionById: builder.query({
            query: (id) => `${baseUrl}/${id}`,
            providesTags: ['Auction'],
        }),
        getAuctionList: builder.query({
            query: (page) => ({ url: `${baseUrl}/`, params: { page } }),
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
            query: (page) => ({ url: `${baseUrl}/new`, params: { page } }),
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
        getEndingAuctionList: builder.query({
            query: (page) => ({ url: `${baseUrl}/ending`, params: { page } }),
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
                url: `${baseUrl}/filter?page=${page}&size=${size}`,
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
                url: `${baseUrl}`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['AuctionList', 'tags', 'userAuctions'],
        }),
        getImageLinks: builder.mutation({
            query: (auctionId) => ({
                url: `${baseUrl}/image-url/${auctionId}`,
                method: 'POST',
            }),
        }),
        getAuctionsByUserId: builder.query({
            query: (userId) => `${baseUrl}/user/${userId}`,
            providesTags: ['userAuctions'],
        }),
        getAuctionsByBidderId: builder.query({
            query: (userId) => `${baseUrl}/bidder/${userId}`,
            providesTags: ['userAuctions'],
        }),
        deleteAuction: builder.mutation({
            query: (id) => ({
                url: `${baseUrl}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AuctionList', 'userAuctions'],
        }),
    }),
    overrideExisting: false,
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
