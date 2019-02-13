import {LOGIN_USER, LOGIN_USER_SUCCESS, LOGOUT_USER} from "./types";

import {Router} from "../../routes";


export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({type: LOGIN_USER});
        // TODO Refactor this
        dispatch(loginUserSuccess({name: email, rol: 'admin'}))
    };
};


export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_USER
        });
        Router.pushRoute('/index')
    }

};
const loginUserSuccess = (user) => {
    return (dispatch) =>{
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: user
        });
        Router.pushRoute('/index')
    };
};


