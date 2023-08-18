import {TYPE} from '../constants/types';

const initialState = {
    role: '',
    token: '',
    isLogin: false,
    isLoading: false,
    email: null,
    profile: {},
    category: {},
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case TYPE.SET_ROLE:
            return {...state, role: action.payload.data};
        case TYPE.AUTH:
            return {
                ...state,
                token: action.payload.data.token,
                isLogin: true,
            };
        case TYPE.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading,
            };
        case TYPE.SET_EMAIL:
            return {
                ...state,
                email: action.payload.email,
            };
        case TYPE.SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case TYPE.SET_CATEGORY:
            return {
                ...state,
                category: action.payload.category,
            };
        default:
            return state;
    }
};

export default reducer;
