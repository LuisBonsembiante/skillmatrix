import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import {Provider} from 'react-redux'
import {loginWithIntranet, userDataFetch} from "../redux/actions";

class SkillMatrix extends App {

    componentDidMount() {
        this.checkSessionStorage();
    }

    checkSessionStorage() {
        const {reduxStore} = this.props;
        const user = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');
        if (user && token) {
            reduxStore.dispatch(loginWithIntranet(token, JSON.parse(user)));
            reduxStore.dispatch(userDataFetch());
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
