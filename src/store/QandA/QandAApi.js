import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { baseUrl } from '../../features/commons/Constants';

export const qAndAAPi = createApi({
    reducerPath: 'qAndAAPi',
    baseQuery: createBaseQuery(`${baseUrl}/QandA`),
    endpoints: (builder) => ({
        getQuestions: builder.query({
            query: (auctionId) => ({ url: `/${auctionId}` }),
            providesTags: ['questions'],
        }),
        postQuestion: builder.mutation({
            query: (body) => ({ url: '/question', method: 'POST', body: body }),
            invalidatesTags: ['questions'],
        }),
    }),
});

export const { useGetQuestionsQuery, usePostQuestionMutation } = qAndAAPi;
