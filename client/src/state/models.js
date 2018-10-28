import axios from 'axios';

export const quotes = {
    state: {
        quotes: [],
        errorMessage: null,
        hasLoaded: false,
    },
    reducers: {
        onQuotesFetchStarted: state => ({
            ...state,
            quotes: [],
            errorMessage: null,
            hasLoaded: false,
        }),
        onQuotesFetched: (state, {quotes}) => ({
            ...state,
            quotes,
            errorMessage: null,
            hasLoaded: true,
        }),
        onQuotesError: (state, {errorMessage}) => ({
            ...state,
            errorMessage,
            quotes: [],
            hasLoaded: true,
        }),
    },
    effects: {
        async fetchQuotes() {
            this.onQuotesFetchStarted();
            try {
                const response = await axios.get('/api/quotes');
                this.onQuotesFetched({quotes: response.data.quotes});
            } catch (ex) {
                this.onQuotesError({errorMessage: ex.response.data.errorMessage});
            }
        },
        async updateQuote(payload) {
            try {
                await axios.put(`/api/quote/${payload.id}`, payload.quote);
                console.log(`working...${payload.id}`);
            } catch (ex) {
                this.onQuotesError({errorMessage: ex.response.data.errorMessage});
            }
        }
    },
};
