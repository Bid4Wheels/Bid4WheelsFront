import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { baseUrl } from '../../features/commons/Constants';

export const questionsAndAnswersApi = createApi({
    reducerPath: 'questionsAndAnswersApi',
    baseQuery: createBaseQuery(`${baseUrl}/QandA`),
    endpoints: (builder) => ({
        getQuestionsAndAnswersByAuctionId: builder.query({
            query: (auctionId) => ({
                url: `/${auctionId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetQuestionsAndAnswersByAuctionIdQuery } = questionsAndAnswersApi;
