import {
    CLEAN_DATA, FETCH_USER_DATA,
    LOGIN_USER, LOGIN_USER_FAILED,
    LOGIN_WITH_GITHUB,
    LOGIN_WITH_GOOGLE,
    LOGIN_WITH_INTRANET,
    LOGOUT_USER
} from "./types";
import {Router} from "../../routes";
import {cleanData, userDataUpdate} from "./FireBaseAction";
import axios from "axios";
import {getUserByEmail} from "../../env";
import services from '../../services';
import http from 'http';
import {getLargeImage} from "../../components/utils/imagesManager";

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({type: LOGIN_USER});
        const user = {username: email + '@folderit.net', password};
        axios
            .post("https://hrm.folderit.net/wp-json/jwt-auth/v1/token", user)
            .then(
                r => {
                    if (r && r.data && r.data.token) {
                        const userResult = {
                            email: r.data.user_email,
                            displayName: r.data.user_display_name,
                            folderHRMID: r.data.user_id,
                            photoURL: ''
                        };
                        sessionStorage.setItem('tokenJWT', r.data.token);
                        const headers = {
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                            'Accept': 'application/json'
                        };


                        axios.post(getUserByEmail, userResult, {headers: headers}).then(async (response) => {
                                const data = response.data;
                                userResult.position = data.user.position;
                                userResult.photoURL = data.user.photoURL;

                                if (!data.user.photoURL) {

                                    let config = {
                                        headers: {
                                            'Access-Control-Allow-Origin': '*',
                                            'Content-Type': 'application/json',
                                            'X-Requested-With': 'XMLHttpRequest',
                                            'X-Auth': r.data.token,
                                            'Accept': 'application/json',
                                            'Authorization': `Bearer ${r.data.token}`,
                                            'Access-Control-Allow-Credentials': true
                                        },
                                        params: {
                                            include: 'avatar'
                                        }
                                    }



                                    // return axios.get(`https://hrm.folderit.net/wp-json/erp/v1/hrm/employees/${userResult.folderHRMID}`, config).then(
                                    //     (response) => {
                                    //         console.log('RESPONSE');
                                    //         userResult.photoURL = response.avatar_url;
                                    //         userResult.uid = data.uid;
                                    //         dispatch(loginWithIntranet(r.data.token, userResult));
                                    //         dispatch({type: FETCH_USER_DATA, payload: data.user});
                                    //         Router.pushRoute('/')
                                    //     }
                                    // );

                                    userResult.photoURL = getLargeImage();
                                    userResult.uid = data.uid;
                                    dispatch(loginWithIntranet(r.data.token, userResult));
                                    dispatch({type: FETCH_USER_DATA, payload: data.user});
                                    Router.pushRoute('/')


                                }


                            }
                        ).catch(e => {
                            dispatch({type: LOGIN_USER_FAILED});
                            console.log(e)
                        });
                    }
                }
            ).catch(e => {
            dispatch({type: LOGIN_USER_FAILED});
            console.log(e)
        })
        ;
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
        dispatch({type: LOGOUT_USER});
        dispatch({type: CLEAN_DATA});
        Router.pushRoute('/login')
    }

};
const loginWithIntranet = (token, user) => {
    return (dispatch) => {
        dispatch({type: LOGIN_WITH_INTRANET, payload: {token, user,}});
        userDataUpdate({email: user.email, photoURL: user.photoURL});
        Router.pushRoute('/')
    };
};


