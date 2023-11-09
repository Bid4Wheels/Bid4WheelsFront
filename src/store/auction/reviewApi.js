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
    }),
});

export const { usePostWinnerReview, usePostOwnerReview } = reviewApi;
