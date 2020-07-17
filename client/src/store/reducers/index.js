import { combineReducers } from 'redux';
import userReducer from './user';
import newsReducer from './news';

export default combineReducers({
    user: userReducer,
    news: newsReducer
})