import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import {Provider} from 'react-redux'
import firebase from '@firebase/app'
import {apiKey, authDomain, databaseURL, messagingSenderId, projectId, storageBucket} from "../env";

class SkillMatrix extends App {

    componentDidMount() {

        let config = {
            apiKey ,
            authDomain,
            databaseURL,
            projectId,
            storageBucket,
            messagingSenderId
        };
        firebase.initializeApp(config);


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
