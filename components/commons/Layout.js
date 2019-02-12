import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import Head from 'next/head';

export default (props) => {
    const {hideHeader} = props;

    return (
        <Container>
            <Head>
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
                />
            </Head>
            {!hideHeader && <Header />}
            {hideHeader && <br/>}

            {props.children}
        </Container>
    );
}