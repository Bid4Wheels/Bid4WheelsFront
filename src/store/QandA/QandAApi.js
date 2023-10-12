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
        answerQuestion: builder.mutation({
            query: (id, body) => ({ url: `/answer/${id}`, method: 'PATCH', body: body }),
            invalidatesTags: ['questions'],
        }),
    }),
});

export const { useGetQuestionsQuery, usePostQuestionMutation, useAnswerQuestionMutation } =
    qAndAAPi;
