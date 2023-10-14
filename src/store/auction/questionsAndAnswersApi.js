import { authenticatedApi } from '../mainApis/authenticatedApi';

const baseUrl = '/QandA';

export const questionsAndAnswersApi = authenticatedApi.injectEndpoints({
    reducerPath: 'questionsAndAnswersApi',
    endpoints: (builder) => ({
        getQuestionsAndAnswersByAuctionId: builder.query({
            query: (auctionId) => ({
                url: `${baseUrl}/${auctionId}`,
                method: 'GET',
            }),
            providesTags: ['questionsAndAnswers'],
        }),
        postQuestion: builder.mutation({
            query: (body) => ({ url: `${baseUrl}/question`, method: 'POST', body: body }),
            invalidatesTags: ['questionsAndAnswers'],
        }),
        answerQuestion: builder.mutation({
            query: (id, body) => ({ url: `${baseUrl}/answer/${id}`, method: 'PATCH', body: body }),
            invalidatesTags: ['questionsAndAnswers'],
        }),
    }),
});

export const { useGetQuestionsAndAnswersByAuctionIdQuery, usePostQuestionMutation } =
    questionsAndAnswersApi;
