import {
    EMAIL_CHANGED,
    LOGIN_USER_SUCCESS,
    PASSWORD_CHANGED,
    LOGIN_USER_FAILED,
    LOGIN_USER,
    LOGIN_CLEAN_ERROR,
    LOGOUT_USER, LOGIN_WITH_GITHUB, LOGIN_WITH_GOOGLE, LOGIN_WITH_INTRANET
} from '../actions/types'

const INITIAL_STATE = {
    user: {email: '', displayName: '', photoURL: '', roles:[], isNew: false},
    error: '',
    loading: false,
    gitHubToken: null,
    googleToken: null,
    intranetToken: null
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case LOGIN_USER:
            return {...state, loading: true, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload};
        case LOGIN_WITH_GITHUB:
            return {...state, error: '', user: action.payload.user, gitHubToken: action.payload.token};
        case LOGIN_WITH_GOOGLE:
            return {...state, error: '', user: action.payload.user, googleToken: action.payload.token};
        case LOGIN_WITH_INTRANET:
            return {...state, loading: false, error: '', user: action.payload.user, intranetToken: action.payload.token};
        case LOGIN_USER_FAILED:
            return {...state, error: 'Authentication Failed.', loading: false};
        case LOGIN_CLEAN_ERROR:
            return {...state, error: '', loading: false};
        case LOGOUT_USER:
            return INITIAL_STATE;

        default:
            return state;
    }
};
