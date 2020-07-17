import { GET_USER, DECODE_THE_JWT, DISCONNECT } from './user-types';

import Axios from 'axios';

export const getUser = (id, newData) => async (dispatch) => {
    let userId = id;
    let userData = newData;
    try {
        if(userId) {
            const { data } = await Axios.get(`/users/user-data/${userId}`);
            return dispatch({
                type: GET_USER,
                payload: data.user
            });
        } else if (newData) {
            return dispatch({
                type: GET_USER,
                payload: userData
            });
        }

    } catch (error) {
        
    }
}

export const decodeTheJWT = (token) => async (dispatch) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
    return dispatch({
        type: DECODE_THE_JWT,
        payload: decodedData
    })
}

export const userDisconnect = () => (dispatch) => {
    return dispatch({
        type: DISCONNECT
    })
}