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
            query: (body) => ({
                url: `${baseUrl}/answer/${body.id}`,
                method: 'PATCH',
                body: body.answer,
            }),
            invalidatesTags: ['questionsAndAnswers'],
        }),
        deleteResponse: builder.mutation({
            query: (questionId) => ({
                url: `${baseUrl}/answer/${questionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['questionsAndAnswers'],
        }),
    }),
});

export const {
    useGetQuestionsAndAnswersByAuctionIdQuery, useDeleteResponseMutation,
    usePostQuestionMutation,
    useAnswerQuestionMutation,
} =
    questionsAndAnswersApi;
