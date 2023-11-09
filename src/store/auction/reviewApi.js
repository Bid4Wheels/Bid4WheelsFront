import { authenticatedApi } from '../mainApis/authenticatedApi';

const baseUrl = '/review';

export const reviewApi = authenticatedApi.injectEndpoints({
    reducerPath: 'reviewApi',
    endpoints: (builder) => ({
        postWinnerReview: builder.mutation({
            query: ({ body, auctionId }) => ({
                url: `${baseUrl}/winner/${auctionId}`,
                method: 'POST',
                body: body,
            }),
        }),
        postOwnerReview: builder.mutation({
            query: ({ body, auctionId }) => ({
                url: `${baseUrl}/owner/${auctionId}`,
                method: 'POST',
                body: body,
            }),
        }),
        getReviewsById: builder.query({
            query: (userId) => ({
                url: `${baseUrl}/${userId}`,
                method: 'GET',
            }),
        }),
        getFilteredReviews: builder.mutation({
            query: ({ rate, userId }) => ({
                url: `${baseUrl}/filter?rate=${rate}&userId=${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    usePostWinnerReview,
    usePostOwnerReview,
    useGetReviewsByIdQuery,
    useGetFilteredReviewsMutation,
} = reviewApi;
