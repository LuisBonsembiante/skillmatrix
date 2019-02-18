import React from 'react';
import {Container, Label} from 'semantic-ui-react';
import Header from './Header';
import Head from 'next/head';

export default (props) => {
    const {hideHeader} = props;

    return (
        <>
            <Container style={{minHeight: '94vh'}}>
                <Head>
                    <link
                        rel="stylesheet"
                        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
                    />
                </Head>
                {!hideHeader && <Header/>}
                {hideHeader && <br/>}

                {props.children}
            </Container>
            {!hideHeader &&
            <Container>
                <div style={{float: 'right', marginTop: '2vh'}}>
                    <Label color='teal'> Created by: </Label>
                    <Label as='a' target="_blank" href='https://github.com/FedeMadoery' basic image>
                        <img src='https://avatars0.githubusercontent.com/u/21246763?s=460&v=4'/>
                        F. Madoery
                    </Label>
                    <Label as='a' target="_blank" href="https://github.com/LuisBonsembiante" basic image>
                        <img src='https://avatars2.githubusercontent.com/u/26602298?s=460&v=4'/>
                        L. Bonsembiante
                    </Label>
                </div>
            </Container>
            }
        </>
    );
}