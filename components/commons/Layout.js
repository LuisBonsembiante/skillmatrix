import React, {useState} from 'react';
import {Container, Label} from 'semantic-ui-react';
import Header from './Header';
import Head from 'next/head';
import Confetti from 'react-dom-confetti';


export default (props) => {
    const {hideHeader} = props;
    const config = {
        angle: 90,
        spread: 45,
        startVelocity: 75,
        elementCount: 100,
        dragFriction: 0.1,
        duration: 2000,
        delay: 0,
        width: "10px",
        height: "10px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };
    const [showConffeti, setShowConffeti] = useState(false);

    const onShowConffeti = () => {
        setShowConffeti(true);
        setTimeout(() => { setShowConffeti(false)}, 500);
    };

    return (
        <>
            <Container style={{minHeight: '94vh'}}>
                <Head>
                    <link
                        rel="stylesheet"
                        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
                    />
                    <link rel="icon" type="image/x-icon" href="../../static/favicon.ico" />
                </Head>
                {!hideHeader && <Header/>}
                {hideHeader && <br/>}

                {props.children}
            </Container>
            {!hideHeader &&
            <Container onMouseEnter={() => onShowConffeti()}>

                <div style={{float: 'right', marginTop: '2vh'}}>

                    <Confetti style={{zIndex: '100'}} active={ showConffeti } config={ config }/>

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