import { GET_USER, DECODE_THE_JWT, DISCONNECT } from '../actions/user/user-types';

const initialState = {
    data: {
        id: 0,
        firstName: '',
        secondName: '',
        email: '',
        subscriptions: []
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USER:    
            return {
                ...state,
                data: action.payload
            };
        case DECODE_THE_JWT:
            return {
                ...state,
                data: {
                    ...state.data,
                    id: +action.payload.id,
                    firstName: action.payload.firstname,
                    secondName: action.payload.secondname,
                    email: action.payload.email,
                    subscriptions: action.payload.subscriptions,
                }
            };
        case DISCONNECT:
            return initialState;
        default: return state;
    }
}