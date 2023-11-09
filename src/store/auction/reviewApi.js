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
            invalidatesTags: ['reviews'],
        }),
        getUserReviews: builder.query({
            query: (userId) => `${baseUrl}/${userId}`,
            providesTags: ['reviews'],
        }),
    }),
});

export const { usePostWinnerReviewMutation, usePostOwnerReviewMutation, useGetUserReviewsQuery } =
    reviewApi;
