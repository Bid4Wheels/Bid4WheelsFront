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
            invalidatesTags: ['reviews'],
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
            providesTags: ['reviews'],
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
    usePostWinnerReviewMutation,
    usePostOwnerReviewMutation,
    useGetReviewsByIdQuery,
    useGetFilteredReviewsMutation,
} = reviewApi;
