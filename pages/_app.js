import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import {Provider} from 'react-redux'
import firebase from 'firebase/app';
import {apiKey, authDomain, databaseURL, messagingSenderId, projectId, storageBucket} from "../env";
import 'firebase/firestore';

class SkillMatrix extends App {

    componentDidMount() {

    }

    render() {
        const {Component, pageProps, reduxStore} = this.props
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
