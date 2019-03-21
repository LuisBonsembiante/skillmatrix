import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import {Provider} from 'react-redux'
import {loginWithGitHub, loginWithGoogle, loginWithIntranet, userDataFetch} from "../redux/actions";

class SkillMatrix extends App {

    componentDidMount() {
        this.checkSessionStorage();
    }

    checkSessionStorage() {
        const {reduxStore} = this.props;
        const user = sessionStorage.getItem('user');
        if (user) {
            if(sessionStorage.getItem('tokenGoogle')) {
                reduxStore.dispatch(loginWithGoogle(sessionStorage.getItem('tokenGoogle'), JSON.parse(user)));
                reduxStore.dispatch(userDataFetch());
            } else if(sessionStorage.getItem('tokenGitHub')) {
                reduxStore.dispatch(loginWithGitHub(sessionStorage.getItem('tokenGitHub'), JSON.parse(user)));
                reduxStore.dispatch(userDataFetch());
            } else if (sessionStorage.getItem('token')) {
                reduxStore.dispatch(loginWithIntranet(sessionStorage.getItem('token'), JSON.parse(user)));
                reduxStore.dispatch(userDataFetch());
            }
        }

    }

    render() {
        const {Component, pageProps, reduxStore} = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default withReduxStore(SkillMatrix)
