import { GET_NEWS, TOGGLE_LOADING, GET_SOURCES } from '../actions/news/news-types';

const initialState = {
    news: [],
    loading: false,
    sources: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_NEWS:    
            return {
                ...state,
                loading: false,
                news: action.payload
            };
        case TOGGLE_LOADING: 
            return {
                ...state,
                loading: true
            };
        case GET_SOURCES:
            return {
                ...state,
                sources: action.payload
            };
        default: return state;
    }
}