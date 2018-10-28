import axios from 'axios';
import store from './index'

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
              const newQuotes = store.getState().quotes.quotes.filter(quote => quote._id !== payload.id);
              newQuotes.push(payload.quote.quote);
              this.onQuotesFetched({ quotes: newQuotes });
            } catch (ex) {
                this.onQuotesError({errorMessage: ex.response.data.errorMessage});
            }
        }
    },
};
