import { GET_NEWS, TOGGLE_LOADING, GET_SOURCES } from './news-types';

import Axios from 'axios';

export const getNews = (id) => async (dispatch) => {
    const userId = id;
    try {
        const { data: { news } } = await Axios.post('/news/get-news', {id: userId});
        return dispatch({
            type: GET_NEWS,
            payload: news
        })
    } catch (error) {
        throw error;   
    }
}

export const toggleLoading = () => async (dispatch) => {
    return dispatch({
        type: TOGGLE_LOADING
    })
}

export const getSources = () => async (dispatch) => {
    try {
        const { data: { sources } } = await Axios.post('/news/get-sources');
        return dispatch({
            type: GET_SOURCES,
            payload: sources
        })
    } catch (error) {
        
    }
}