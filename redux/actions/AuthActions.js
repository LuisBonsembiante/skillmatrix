import {LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_WITH_GITHUB, LOGIN_WITH_GOOGLE, LOGOUT_USER} from "./types";
import {Router} from "../../routes";
import {userDataUpdate} from "./FireBaseAction";


export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({type: LOGIN_USER});
        // TODO Refactor this
        dispatch(loginUserSuccess({name: email, rol: 'admin'}))
    };
};


export const loginWithGitHub = (token, user) => {
    return (dispatch) => {
        dispatch({type: LOGIN_WITH_GITHUB, payload: {token, user}});
        userDataUpdate({email: user.email, photoURL: user.photoURL});
        Router.pushRoute('/')
    };
};

export const loginWithGoogle = (token, user) => {
    return (dispatch) => {
        dispatch({type: LOGIN_WITH_GOOGLE, payload: {token, user}});
        userDataUpdate({email: user.email, photoURL: user.photoURL});
        Router.pushRoute('/')
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_USER
        });
        Router.pushRoute('/login')
    }

};
const loginUserSuccess = (user) => {
    return (dispatch) =>{
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: user
        });
        Router.pushRoute('/')
    };
};


