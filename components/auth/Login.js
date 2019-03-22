import React, {useState} from 'react';
import {Button, Form, Grid, Header, Input, Message, Segment, TransitionablePortal} from "semantic-ui-react";
import {Link} from '../../routes';
import {connect} from "react-redux";
import {loginUser, loginWithGitHub, loginWithGoogle, cleanError} from "../../redux/actions";
import {firebase} from '@firebase/app';

const _login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, showAlert] = useState(false);
    const [error, setError] = useState({errorCode: 0, errorMessage: ''});

    if (error.errorMessage === '' && error.errorMessage !== props.errorLogin)
        setError({errorCode: 403, errorMessage: props.errorLogin});

    const handlerGitHubLogin = () => {
        const provider = new firebase.auth.GithubAuthProvider();

        loginWithFirebasePopup(provider, props.loginWithGitHub);
    };


    const handlerGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().useDeviceLanguage();
        loginWithFirebasePopup(provider, props.loginWithGoogle);
    };

    const loginWithFirebasePopup = (provider, loginSuccess) => {


        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const isNew  = result.additionalUserInfo.isNewUser;
            loginSuccess(token, user, isNew);
        }).catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            setError({errorCode, errorMessage});
            showAlert(true);
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
        });
    };


    const login = () => {

        if (email.length === 0 || password.length === 0) {
            setError({errorCode: 1, errorMessage: 'Complete the fields'});
            return;
        }

        props.loginUser(email, password);
    }

    const resetError = () => {
        props.cleanError();
        setError({errorCode: 0, errorMessage: ''})
    }

    return (
        <Grid centered columns={2}>
            <Grid.Column>
                <Header as="h2" textAlign="center">
                    Login
                </Header>

                <TransitionablePortal onClose={() => showAlert(false)} open={alert}
                                      transition={{animation: 'fly up', duration: 500}}>
                    <Grid centered columns={1} style={{position: 'absolute', top: '50%', left: '26.5%'}}>
                        <Grid.Column>
                            <Segment color='red'>
                                <Message warning>
                                    <Message.Header>We're sorry we can't do that</Message.Header>
                                    <p>{error.errorCode}</p>
                                    <p>{error.errorMessage}</p>
                                </Message>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </TransitionablePortal>

                <Segment>
                    {/*<Form size="large" error={error.errorCode > 0}>
                        <Form.Field>
                            <Input
                                fluid
                                icon='users'
                                iconPosition='left'
                                labelPosition='right'
                                placeholder="Email address"
                                onChange={(event) =>{ resetError(); setEmail(event.target.value)}}
                                label={{content: '@folderit.net'}}
                            />
                        </Form.Field>

                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            onChange={(event) => {resetError(); setPassword(event.target.value)}}
                        />

                        <Button color="blue" fluid size="large" loading={props.auth.loading}
                                onClick={() => {resetError(); login(); }}>
                            Login
                        </Button>


                        <Message error>
                            <Message.Header>We're sorry we can't do that</Message.Header>
                            <p>{error.errorMessage}</p>
                        </Message>


                    </Form>
*/}

                    <Grid centered columns={1}>
                        <Grid.Column>
                            <Message warning style={{textAlign: 'center'}}>
                                <Message.Header >You must use GitHub or Google to login!</Message.Header>
                                <p >Sorry, but in order to use the app you must login, with one of the two available
                                    methods.</p>
                            </Message>
                        </Grid.Column>
                    </Grid>

                    <br/>

                    <Grid centered columns={3}>
                        <Grid.Column>
                            <Button
                                icon='github' labelPosition='left' color='black' onClick={handlerGitHubLogin}
                                label={{as: 'button', basic: true, content: 'Login with'}}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                icon='google' labelPosition='left' color='red' onClick={handlerGoogleLogin}
                                label={{as: 'button', basic: true, content: 'Login with'}}
                            />
                        </Grid.Column>
                    </Grid>

                </Segment>

                <div width="100%" align="center">
                    <span style={{color: 'purple', paddingLeft: '10px'}}>Powered by Folder IT</span>
                </div>

            </Grid.Column>

        </Grid>
    );
};

function mapStateToProps(state) {
    return {
        ...state,
        errorLogin: state.auth.error
    }
}

export default connect(mapStateToProps, {loginUser, loginWithGitHub, loginWithGoogle, cleanError})(_login);
