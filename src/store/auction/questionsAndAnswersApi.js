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
    }),
});

export const { useGetQuestionsAndAnswersByAuctionIdQuery } = questionsAndAnswersApi;
