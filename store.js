import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'


export const actionTypes = {
    LOGIN_USER_SUCCESS: 'login_user_success',
    LOGIN_USER_FAILED: 'login_user_failed',
    LOGIN_USER: 'login_user',
    LOGOUT_USER: 'logout_user',
}

const INITIAL_STATE = {user: null, error: '', loading: false};

// REDUCERS
export const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return {...state, loading: true, error: ''};
        case actionTypes.LOGIN_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload};
        case actionTypes.LOGIN_USER_FAILED:
            return {...state, error: 'Authentication Failed.', loading: false};
        case actionTypes.LOGOUT_USER:
            return INITIAL_STATE;

        default:
            return state;
    }
};

// ACTIONS
export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({type: actionTypes.LOGIN_USER});
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.LOGOUT_USER
        });
    }

};

const loginUserSucces = (dispatch, user) => {
    dispatch({
        type: actionTypes.LOGIN_USER_SUCCESS,
        payload: user
    });
};

export function initializeStore(initialState = INITIAL_STATE) {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}